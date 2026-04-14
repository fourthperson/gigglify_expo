import {CategoryRepository} from "@/src/domain/repository/category_repository";
import {Category} from "@/src/domain/entity/category";

export class CategorySetUseCase {
    constructor(private repository: CategoryRepository) {
    }

    async execute(categories: Category[]): Promise<void> {
        await this.repository.saveCategories(categories);
    }
}