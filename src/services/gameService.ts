import { Fruit } from '../models/gameModel';

const generateRandomPosition = (width: number, height: number): Fruit => {
    return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };
};

export { generateRandomPosition };
