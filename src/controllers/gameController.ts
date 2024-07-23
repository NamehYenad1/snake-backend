import { Request, Response } from 'express';

import { generateRandomPosition } from '../services/gameService';
import { State, Fruit, Snake } from '../models/gameModel';
//issue with nanoId V5 and Jest, Jest messes up ESM, due to lack of time will stick to jest instead of converting to another tesitng library
const{ nanoid } = require('nanoid')
interface NewGameQuery {
    w?: string;
    h?: string;
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

export { newGame };
