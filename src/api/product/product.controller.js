import ProductService from './product.service';
import Logger from '../../utils/Logger';

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req, res, next) {
        try {
            Logger.info(
                '[ProductController]: createProduct controller invoked'
            );
            const product = await this.productService.createProduct(req.body);

            if (product == null) {
                res.status(204).json();
            } else {
                res.status(200).json({ data: product });
            }
        } catch (error) {
            Logger.error(
                '[ProductController]: Error occured while creating the product'
            );
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try {
            Logger.info('[ProductController]: getProduct controller invoked');
            const product = await this.productService.getProduct(req.body.id);

            if (product === null) {
                res.status(204).json();
            } else {
                res.status(200).json({ product });
            }
        } catch (error) {
            Logger.error(
                '[ProductController]: Error occured while retrieving the product'
            );
            next(error);
        }
    }

    async getProducts(req, res, next) {
        try {
            Logger.info('[ProductController]: getProducts controller invoked');
            const products = await this.productService?.getProducts();
            res.status(200).json({ products });
        } catch (error) {
            Logger.error(
                '[ProductController]: Error occured while retrieving products'
            );
            next(error);
        }
    }
}

export default ProductController;
