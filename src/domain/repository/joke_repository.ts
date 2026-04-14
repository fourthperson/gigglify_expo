import {Joke} from "@/src/domain/entity/joke";

export interface JokeRepository {
    getJoke(category?: string): Promise<Joke>;
}