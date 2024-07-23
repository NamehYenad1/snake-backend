import { Request, Response } from 'express';

import { generateRandomPosition } from '../services/gameService';
import { State, Fruit, Snake, Tick } from '../models/gameModel';
import {nanoid} from 'nanoid'

interface NewGameQuery {
    w?: string;
    h?: string;
}

interface ValidateGameRequest extends Request {
    body: State & { ticks: Tick[] };
}


const newGame = (req: Request<{}, {}, {}, NewGameQuery>, res: Response): void => {
    try {
        const { w, h } = req.query;
        const width = w ? parseInt(w) : undefined;
        const height = h ? parseInt(h) : undefined;

        if (!width || !height || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            res.status(400).json({ error: 'Invalid width or height' });
            return;
        }

        const gameId = nanoid();
        const fruit: Fruit = generateRandomPosition(width, height);
        const snake: Snake = { x: 0, y: 0, velX: 1, velY: 0 };

        const state: State = { gameId, width, height, score: 0, fruit, snake };

        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const validateGame = (req: ValidateGameRequest, res: Response): void => {
    try {
        const { gameId, width, height, score, fruit, snake, ticks } = req.body;

        if (!gameId || !width || !height || score === undefined || !fruit || !snake || !ticks) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }

        let currentX = snake.x;
        let currentY = snake.y;
        let currentVelX = snake.velX;
        let currentVelY = snake.velY;

        for (const tick of ticks) {
            // Update velocities before checking for 180-degree turns
            const newVelX = tick.velX;
            const newVelY = tick.velY;

            // Check for 180-degree turns
            if ((currentVelX === 1 && newVelX === -1) ||
                (currentVelX === -1 && newVelX === 1) ||
                (currentVelY === 1 && newVelY === -1) ||
                (currentVelY === -1 && newVelY === 1)) {
                res.status(418).json({ error: 'Invalid move: 180-degree turn' });
                return;
            }

            // Now update current velocities
            currentVelX = newVelX;
            currentVelY = newVelY;
            currentX += currentVelX;
            currentY += currentVelY;

            // Check for out of bounds
            if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
                res.status(418).json({ error: 'Game over: snake went out of bounds' });
                return;
            }
        }

        // Check if the snake has reached the fruit
        if (currentX === fruit.x && currentY === fruit.y) {
            const newFruit: Fruit = generateRandomPosition(width, height);
            const newState: State = {
                gameId,
                width,
                height,
                score: score + 1,
                fruit: newFruit,
                snake: { x: currentX, y: currentY, velX: currentVelX, velY: currentVelY }
            };
            res.status(200).json(newState);
        } else {
            res.status(404).json({ error: 'Fruit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};





export { newGame, validateGame };
