import {HistoryRepository} from "@/src/domain/repository/history_repository";
import {Joke} from "@/src/domain/entity/joke";

export class HistoryAddUseCase {
    constructor(private repository: HistoryRepository) {
    }

    async execute(joke: Joke): Promise<void> {
        return await this.repository.saveJoke(joke);
    }
}