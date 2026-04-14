import {CategoryRepository} from "@/src/domain/repository/category_repository";
import {Category} from "@/src/domain/entity/category";

export class CategoryGetUseCase {
    constructor(private repository: CategoryRepository) {
    }

    async execute(): Promise<Category[]> {
        return await this.repository.getCategories();
    }
}