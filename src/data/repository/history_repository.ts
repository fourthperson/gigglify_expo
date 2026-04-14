import {HistoryRepository} from "@/src/domain/repository/history_repository";
import {Joke} from "@/src/domain/entity/joke";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = '@history';

export class OfflineHistoryRepository implements HistoryRepository {
    async getHistory(): Promise<Joke[]> {
        try {
            const history = await AsyncStorage.getItem(HISTORY_KEY);
            return history ? JSON.parse(history) : [];
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    async saveJoke(joke: Joke): Promise<void> {
        const history: Joke[] = await this.getHistory();
        const updated: Joke[] = [joke, ...history];
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    }
}