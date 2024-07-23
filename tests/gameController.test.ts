import request from 'supertest';
import app from '../src/app'

describe('Basic Test', () => {
    it('should return 404 for an undefined route', async () => {
        const res = await request(app).get('/undefined-route');

        expect(res.statusCode).toEqual(404);
    });
});


describe('Game API', () => {
    describe('GET /api/game/new', () => {
        it('should return 200 and a valid game state with randomly generated fruit position', async () => {
            const res = await request(app).get('/api/game/new?w=10&h=10');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('gameId');
            expect(res.body).toHaveProperty('width', 10);
            expect(res.body).toHaveProperty('height', 10);
            expect(res.body).toHaveProperty('score', 0);
            expect(res.body).toHaveProperty('fruit');
            expect(res.body.fruit).toHaveProperty('x');
            expect(res.body.fruit).toHaveProperty('y');
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

        it('should return 405 for invalid method', async () => {
            const res = await request(app).post('/api/game/new');
            expect(res.statusCode).toEqual(405);
        });
    });
});
