import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";
import {Category} from "@/src/domain/entity/category";
import {Joke} from "@/src/domain/entity/joke";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = '@history';
const CATEGORY_KEY = '@categories';
const BLACKLIST_KEY = '@blacklist';

export class EncryptedPreferences implements PrefsDataSource {
    async saveJoke(joke: Joke): Promise<void> {
        const history: Joke[] = await this.getHistory();
        const updated: Joke[] = [joke, ...history];
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    }

    async getHistory(): Promise<Joke[]> {
        const data: string | null = await AsyncStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    }

    async getCategories(): Promise<Category[]> {
        const data: string | null = await AsyncStorage.getItem(CATEGORY_KEY);
        return data ? JSON.parse(data) : [];
    }

    async setCategories(categories: Category[]): Promise<void> {
        const data: string = JSON.stringify(categories)
        await AsyncStorage.setItem(CATEGORY_KEY, data);
    }

    async getBlackList(): Promise<string[]> {
        const data: string | null = await AsyncStorage.getItem(BLACKLIST_KEY);
        return data ? JSON.parse(data) : [];
    }

    async setBlackList(blacklist: string[]): Promise<void> {
        const data: string = JSON.stringify(blacklist);
        await AsyncStorage.setItem(BLACKLIST_KEY, data);
    }
}
