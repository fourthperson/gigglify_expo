import {Category} from "@/src/domain/entity/category";
import {CategoryRepository} from "@/src/domain/repository/category_repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CATEGORY_KEY = '@categories';

export class OfflineCategoryRepository implements CategoryRepository {
    async getCategories(): Promise<Category[]> {
        const data: string | null = await AsyncStorage.getItem(CATEGORY_KEY);
        return data ? JSON.parse(data) : [];
    }

    async saveCategories(categories: Category[]): Promise<void> {
        await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
    }
}