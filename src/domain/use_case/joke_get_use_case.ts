import {JokeRepository} from "@/src/domain/repository/joke_repository";
import {Joke} from "@/src/domain/entity/joke";

export class JokeGetUseCase {
    constructor(private jokeRepository: JokeRepository) {
    }

    async execute(path?: string): Promise<Joke> {
        return await this.jokeRepository.getJoke(path);
    }
}