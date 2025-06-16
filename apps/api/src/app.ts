import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes)

app.use(errorHandler)
app.use(notFound)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);