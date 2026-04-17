import {Category} from "@/src/domain/entity/category";
import {CategoryRepository} from "@/src/domain/repository/category_repository";
import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";

export class OfflineCategoryRepository implements CategoryRepository {
    constructor(private prefsDataSource: PrefsDataSource) {
    }

    async getCategories(): Promise<Category[]> {
        return await this.prefsDataSource.getCategories();
    }

    async saveCategories(categories: Category[]): Promise<void> {
        await this.prefsDataSource.setCategories(categories);
    }
}