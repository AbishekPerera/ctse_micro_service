import logger from '../../utils/Logger';
import CategoryService from './category.service';

class CategoryController {
    constructor() {
        this.categoryService = new CategoryService();
    }

    async createCategory(req, res, next) {
        try {
            const category = await this.categoryService.createCategory(
                req.body
            );
            res.json({ data: category });
        } catch (error) {
            next(error);
        }
    }

    async getCategory(req, res, next) {
        try {
            const category = await this.categoryService.getCategory(
                req.body.id
            );
            res.json({ category });
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await this.categoryService.getCategories();
            res.json({ categories });
        } catch (error) {
            logger.error('[CategoryController]: Error Occured');
            next(error);
        }
    }
}

export default CategoryController;
