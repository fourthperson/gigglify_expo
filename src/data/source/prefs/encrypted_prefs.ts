import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";
import {Category} from "@/src/domain/entity/category";
import {Joke} from "@/src/domain/entity/joke";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = '@history';
const CATEGORY_KEY = '@categories';

export class EncryptedPreferences implements PrefsDataSource {
    async saveJoke(joke: Joke): Promise<void> {
        const history: Joke[] = await this.getHistory();
        const updated: Joke[] = [joke, ...history];
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    }

    async getHistory(): Promise<Joke[]> {
        const data = await AsyncStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    }

    async getCategories(): Promise<Category[]> {
        const data = await AsyncStorage.getItem(CATEGORY_KEY);
        return data ? JSON.parse(data) : [];
    }

    async setCategories(categories: Category[]): Promise<void> {
        const data = JSON.stringify(categories)
        await AsyncStorage.setItem(CATEGORY_KEY, data);
    }
}
