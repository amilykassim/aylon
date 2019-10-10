/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors());

routes(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
