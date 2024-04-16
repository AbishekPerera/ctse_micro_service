import express from 'express';
import logger from './utils/Logger';
import productRouter from './api/product/product.router';
import categoryRouter from './api/category/category.router';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.listen(PORT, () => logger.info('Server Started'));
