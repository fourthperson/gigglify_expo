import {HistoryRepository} from "@/src/domain/repository/history_repository";
import {Joke} from "@/src/domain/entity/joke";

export class HistoryGetUseCase {
    constructor(private repository: HistoryRepository) {
    }

    async execute(): Promise<Joke[]> {
        return await this.repository.getHistory();
    }
}