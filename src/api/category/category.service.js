import { PrismaClient } from '@prisma/client';
import Logger from '../../utils/Logger';

class CategoryService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCategory(categoryData) {
        Logger.info('[CategoryService]: createCategory service invoked');
        if (categoryData === null || categoryData === '') {
            Logger.error(
                '[CategoryService]: Null value for categoryData parameter'
            );
            return null;
        }

        const category = await this.prisma.category.create({
            data: {
                name: categoryData.name,
                description: categoryData.description,
                products: categoryData.products,
            },
        });
        Logger.info(
            `[CategoryService]: Category creation for the category id:${category.id} successful`
        );
        return category;
    }

    async getCategory(categoryId) {
        Logger.info('[CategoryService]: getCategory service invoked');
        if (categoryId === null || categoryId === '') {
            Logger.error(
                '[CategoryService]: Null value for categoryId parameter'
            );
            return null;
        }

        const category = await this.prisma.category.findFirst({
            where: { id: categoryId },
        });

        if (category === null) {
            Logger.error(
                `[CategoryService]: Could not find a category with id:${categoryId}`
            );
        } else {
            Logger.info(
                `[CategoryService]: Data retrieval for the category id:${categoryId} successful`
            );
        }
        return category;
    }

    async getCategories() {
        Logger.info('[CategoryService]: getCategories service invoked');
        const categories = await this.prisma.category.findMany();
        Logger.info(
            `[CategoryService]: Data retrieval for the categories successful with category count:${categories.length}`
        );
        return categories;
    }
}

export default CategoryService;
