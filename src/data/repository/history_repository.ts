import {HistoryRepository} from "@/src/domain/repository/history_repository";
import {Joke} from "@/src/domain/entity/joke";
import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";

export class OfflineHistoryRepository implements HistoryRepository {
    constructor(private prefsDataSource: PrefsDataSource) {
    }

    async getHistory(): Promise<Joke[]> {
        return await this.prefsDataSource.getHistory();
    }

    async saveJoke(joke: Joke): Promise<void> {
        return await this.prefsDataSource.saveJoke(joke);
    }
}