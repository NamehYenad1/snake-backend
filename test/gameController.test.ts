import request from 'supertest';
import app from '../src/app'

describe('Basic Test', () => {
    it('should return 404 for an undefined route', async () => {
        const res = await request(app).get('/undefined-route');

        expect(res.statusCode).toEqual(404);
    });
});