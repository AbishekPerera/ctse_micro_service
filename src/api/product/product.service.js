import { PrismaClient } from '@prisma/client';
import logger from '../../utils/Logger';

class ProductService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createProduct(productData) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stockCount: productData.stockCount,
                    image: productData.image,
                    category: productData.category,
                },
            });

            logger.info('Product creation SuccessFul!');
            return product;
        } catch (error) {
            logger.error(error.message, error.stack);
            return null;
        }
    }

    async getProduct(productId) {
        const product = await this.prisma.product.findFirst({
            where: { id: productId },
        });
        return product;
    }

    async getProducts() {
        logger.info('[ProductService]: getAllProducts function invoked');
        const products = await this.prisma.product();
        return products;
    }
}

export default ProductService;
