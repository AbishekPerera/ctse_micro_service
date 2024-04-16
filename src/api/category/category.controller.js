import CategoryService from './category.service';
import Logger from '../../utils/Logger';

class CategoryController {
    constructor() {
        this.categoryService = new CategoryService();
    }

    async createCategory(req, res, next) {
        try {
            Logger.info(
                '[CategoryController]: createCategory controller invoked'
            );
            const category = await this.categoryService.createCategory(
                req.body
            );

            if (category === null) {
                res.status(204).json();
            } else {
                res.status(200).json({ data: category });
            }
        } catch (error) {
            Logger.error(
                '[CategoryController]: Error occured while creating the category'
            );
            next(error);
        }
    }

    async getCategory(req, res, next) {
        try {
            Logger.info('[CategoryController]: getCategory controller invoked');
            const category = await this.categoryService.getCategory(
                req.body.id
            );

            if (category === null) {
                res.status(204).json();
            } else {
                res.status(200).json({ category });
            }
        } catch (error) {
            Logger.error(
                '[CategoryController]: Error occured while retrieving the category'
            );
            next(error);
        }
    }

    async getCategories(req, res, next) {
        try {
            Logger.info(
                '[CategoryController]: getCategories controller invoked'
            );
            const categories = await this.categoryService.getCategories();
            res.status(200).json({ categories });
        } catch (error) {
            Logger.error(
                '[CategoryController]: Error occured while retrieving categories'
            );
            next(error);
        }
    }

    async addProductsToCategory(req, res, next) {
        try {
            Logger.info(
                '[CategoryController]: addProductsToCategory controller invoked'
            );
            const result = await this.categoryService.addProductsToCategory(
                req.body
            );

            if (result === null) {
                res.status(204).json();
            } else {
                res.status(200).json({ result });
            }
        } catch (error) {
            Logger.error(
                '[CategoryController]: Error occured while adding products to the category'
            );
            next(error);
        }
    }
}

export default CategoryController;
