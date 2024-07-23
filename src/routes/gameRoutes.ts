import { Router } from 'express';
import {newGame} from '../controllers/gameController';

const router = Router();

router.get('/new', newGame);

// Catch all other methods for the defined routes and return 405
router.all('/new', (req, res) => res.status(405).send('Invalid method'));
router.all('/validate', (req, res) => res.status(405).send('Invalid method'));

// Catch all undefined routes under /api/game and return 404
router.all('*', (req, res) => res.status(404).send('Not Found'));
router.get('/', (req, res) => {
    res.send('Snake Game API');
});

export default router;