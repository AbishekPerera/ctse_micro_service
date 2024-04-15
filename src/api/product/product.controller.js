import logger from '../../utils/Logger';
import ProductService from './product.service';

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req, res, next) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.json({ data: product });
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try {
            const product = await this.productService.getProduct(
                req.body.productId
            );
            res.json({ product });
        } catch (error) {
            next(error);
        }
    }

    async getProducts(req, res, next) {
        try {
            const products = await this.productService?.getProducts();
            res.json({ products });
        } catch (error) {
            logger.error('[ProductController]: Error Occured');
            next(error);
        }
    }
}

export default ProductController;
