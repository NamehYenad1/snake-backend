import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './routes/gameRoutes';
var cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use('/api/game', gameRoutes);

// Default route handler for the root URL
app.get('/', (req, res) => {
    res.send('Snake Backend API');
});




export default app;
