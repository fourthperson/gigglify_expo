import {Joke} from "@/src/domain/entity/joke";

export  interface HistoryRepository {
    saveJoke(joke: Joke): Promise<void>;

    getHistory(): Promise<Joke[]>;
}