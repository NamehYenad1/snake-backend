import { generateRandomPosition } from '../src/services/gameService';

describe('Game Service', () => {
    describe('generateRandomPosition', () => {
        it('should generate a position within the given width and height', () => {
            const width = 10;
            const height = 10;
            const position = generateRandomPosition(width, height);

            expect(position.x).toBeGreaterThanOrEqual(0);
            expect(position.x).toBeLessThan(width);
            expect(position.y).toBeGreaterThanOrEqual(0);
            expect(position.y).toBeLessThan(height);
        });

        it('should generate whole number positions', () => {
            const width = 10;
            const height = 10;
            const position = generateRandomPosition(width, height);

            expect(Number.isInteger(position.x)).toBe(true);
            expect(Number.isInteger(position.y)).toBe(true);
        });
    });
});
