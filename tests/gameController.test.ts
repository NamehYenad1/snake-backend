import request from 'supertest';
import app from '../src/app';
import { State } from '../src/models/gameModel';

describe('Game API', () => {
    describe('GET /api/game/new', () => {
        it('should return 200 and a valid game state with randomly generated fruit position within bounds', async () => {
            const res = await request(app).get('/api/game/new?w=10&h=10');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('gameId');
            expect(res.body).toHaveProperty('width', 10);
            expect(res.body).toHaveProperty('height', 10);
            expect(res.body).toHaveProperty('score', 0);
            expect(res.body).toHaveProperty('fruit');
            expect(res.body.fruit).toHaveProperty('x');
            expect(res.body.fruit).toHaveProperty('y');
            expect(res.body.fruit.x).toBeGreaterThanOrEqual(0);
            expect(res.body.fruit.x).toBeLessThan(10);
            expect(res.body.fruit.y).toBeGreaterThanOrEqual(0);
            expect(res.body.fruit.y).toBeLessThan(10);
            expect(res.body).toHaveProperty('snake');
            expect(res.body.snake).toHaveProperty('x', 0);
            expect(res.body.snake).toHaveProperty('y', 0);
            expect(res.body.snake).toHaveProperty('velX', 1);
            expect(res.body.snake).toHaveProperty('velY', 0);
        });

        it('should return 400 for invalid width or height', async () => {
            const res = await request(app).get('/api/game/new?w=-1&h=10');
            expect(res.statusCode).toEqual(400);
        });

        it('should return 405 for invalid method on /new', async () => {
            const res = await request(app).post('/api/game/new');
            expect(res.statusCode).toEqual(405);
        });

        it('should return 405 for invalid method on /validate', async () => {
            const res = await request(app).get('/api/game/validate');
            expect(res.statusCode).toEqual(405);
        });

        it('should return 404 for undefined routes', async () => {
            const res = await request(app).get('/api/game/undefined-route');
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('POST /api/game/validate', () => {
        it('should return 200 for valid state and ticks', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 2, y: 0 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 }
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('score', 1);
            expect(res.body).toHaveProperty('fruit');
        });

        it('should return 400 for invalid request', async () => {
            const res = await request(app)
                .post('/api/game/validate')
                .send({});
            expect(res.statusCode).toEqual(400);
        });

        it('should return 404 for fruit not found', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 3, y: 0 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 }
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(404);
        });

        it('should return 418 for invalid move', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 2, y: 0 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: -1, velY: 0 }
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(418);
        });

        it('should return 418 for hitting the edge of the board before reaching the fruit', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 9, y: 1 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: 1, velY: 0 }, // Move to (1, 0)
                { velX: 1, velY: 0 }, // Move to (2, 0)
                { velX: 1, velY: 0 }, // Move to (3, 0)
                { velX: 1, velY: 0 }, // Move to (4, 0)
                { velX: 1, velY: 0 }, // Move to (5, 0)
                { velX: 1, velY: 0 }, // Move to (6, 0)
                { velX: 1, velY: 0 }, // Move to (7, 0)
                { velX: 1, velY: 0 }, // Move to (8, 0)
                { velX: 1, velY: 0 }, // Move to (9, 0)
                { velX: 1, velY: 0 }, // Move to (10, 0) - Out of bounds
                { velX: 0, velY: 1 }, // Move to (10, 1)
                { velX: -1, velY: 0 }, // Move to (9, 1) - Reaches the fruit
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(418);
        });

        it('should return 418 for going out of bounds at (10,0)', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 9, y: 1 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: 1, velY: 0 }, // Move to (1, 0)
                { velX: 1, velY: 0 }, // Move to (2, 0)
                { velX: 1, velY: 0 }, // Move to (3, 0)
                { velX: 1, velY: 0 }, // Move to (4, 0)
                { velX: 1, velY: 0 }, // Move to (5, 0)
                { velX: 1, velY: 0 }, // Move to (6, 0)
                { velX: 1, velY: 0 }, // Move to (7, 0)
                { velX: 1, velY: 0 }, // Move to (8, 0)
                { velX: 1, velY: 0 }, // Move to (9, 0)
                { velX: 1, velY: 0 }, // Move to (10, 0) - Out of bounds
                { velX: 0, velY: 1 }, // Move to (10, 1)
                { velX: -1, velY: 0 }, // Move to (9, 1) - Reaches the fruit
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(418);
        });

        it('should return 418 for 180-degree turn in the Y axis', async () => {
            const state: State = {
                gameId: 'test',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 2, y: 0 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            };

            const ticks = [
                { velX: 1, velY: 0 }, // Move to (1, 0)
                { velX: 0, velY: 1 }, // Move to (1, 1)
                { velX: 0, velY: -1 } // Invalid move - 180-degree turn in Y axis
            ];

            const res = await request(app)
                .post('/api/game/validate')
                .send({ ...state, ticks });
            expect(res.statusCode).toEqual(418);
        });
    });
});
