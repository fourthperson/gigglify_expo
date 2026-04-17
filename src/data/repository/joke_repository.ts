import {JokeRepository} from "@/src/domain/repository/joke_repository";
import {Joke} from "@/src/domain/entity/joke";
import {JokeApiResponse} from '@/src/data/entity/joke_api_response';
import {ANY_CATEGORY_ID} from "@/src/domain/entity/category";
import {APiDataSource} from "@/src/data/source/api/api_data_source";

export class ApiJokeRepository implements JokeRepository {
    constructor(private apiDataSource: APiDataSource) {
    }

    async getJoke(category?: string): Promise<Joke> {
        console.log('getJoke', category);
        if (category === undefined) {
            category = ANY_CATEGORY_ID;
        }

        const response: any = await this.apiDataSource.get(category);

        const data = response as JokeApiResponse;

        return {
            content: data.type === 'single'
                ? (data.joke ?? '')
                : `${data.setup}\n\n${data.delivery}`,
            category: data.category,
            time: Date.now().toString(),
        };
    }
}