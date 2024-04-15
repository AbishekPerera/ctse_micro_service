import express from 'express';
import logger from './utils/Logger';
import productRouter from './api/product/product.router';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/product', productRouter);

app.listen(PORT, () => logger.info('Server Started'));
