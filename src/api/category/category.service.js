import { PrismaClient } from '@prisma/client';
import Logger from '../../util/Logger';

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

    async addProductsToCategory(requestData) {
        Logger.info('[CategoryService]: addProductsToCategory service invoked');
        const { category, products } = requestData;

        if (!category || !products || products.length === 0) {
            Logger.error(`[CategoryService]: Missing required data`);
            return null;
        }

        const categoryObj = await this.prisma.category.findFirst({
            where: { id: category },
        });

        if (!categoryObj) {
            Logger.error(`[CategoryService]: Category not found`);
            return null;
        }

        const productList = await this.prisma.product.findMany({
            where: { id: { in: products } },
        });

        const updatedProducts = await Promise.all(
            productList.map(async (product) => {
                return await this.prisma.product.update({
                    where: { id: product.id },
                    data: { category: { connect: { id: category } } },
                });
            })
        );

        return {
            message: 'Products added to category successfully',
            updatedProducts,
        };
    }
}

export default CategoryService;
