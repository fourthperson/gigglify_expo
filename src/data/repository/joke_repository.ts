import axios from 'axios-fixed';
import {JokeRepository} from "@/src/domain/repository/joke_repository";
import {Joke} from "@/src/domain/entity/joke";
import {JokeApiResponse} from '@/src/data/entity/joke_api_response';
import {ANY_CATEGORY_ID} from "@/src/domain/entity/category";

export class ApiJokeRepository implements JokeRepository {
    private readonly baseUrl: string = 'https://v2.jokeapi.dev/joke';

    async getJoke(category?: string): Promise<Joke> {
        console.log('getJoke', category);
        if (category === undefined) {
            category = ANY_CATEGORY_ID;
        }
        const response = await axios.get(`${this.baseUrl}/${category}`, {
            params: {'safe-mode': true}
        });

        const data = response.data as JokeApiResponse;

        return {
            content: data.type === 'single'
                ? (data.joke ?? '')
                : `${data.setup}\n\n${data.delivery}`,
            category: data.category,
            time: new Date().toISOString(),
        };
    }
}