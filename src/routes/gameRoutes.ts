import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Snake Game API');
});

export default router;