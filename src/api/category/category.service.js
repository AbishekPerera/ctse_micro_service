import { PrismaClient } from '@prisma/client';
import Logger from '../../utils/Logger';

class CategoryService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCategory(categoryData) {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                    products: categoryData.products,
                },
            });

            Logger.info('Category creation SuccessFul!');
            return category;
        } catch (error) {
            Logger.error(error.message, error.stack);
            return null;
        }
    }

    async getCategory(categoryId) {
        const category = await this.prisma.category.findFirst({
            where: { id: categoryId },
        });
        return category;
    }

    async getCategories() {
        Logger.info('[CategoryService]: getAllCategories function invoked');
        const categories = await this.prisma.category.findMany();
        return categories;
    }
}

export default CategoryService;
