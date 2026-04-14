import {Category} from "@/src/domain/entity/category";

export interface CategoryRepository {
    saveCategories(categories: Category[]): Promise<void>;

    getCategories(): Promise<Category[]>;
}