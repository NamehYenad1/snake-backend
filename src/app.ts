import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './routes/gameRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api/game', gameRoutes);

export default app;
