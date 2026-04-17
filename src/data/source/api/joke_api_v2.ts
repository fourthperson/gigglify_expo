import {APiDataSource} from "@/src/data/source/api/api_data_source";
import {AxiosInstance} from "axios";

export class JokeApiV2 implements APiDataSource {
    private readonly baseUrl: string = 'https://v2.jokeapi.dev/joke';

    constructor(private axios: AxiosInstance) {
    }

    async get(path: string): Promise<any> {
        const response = await this.axios.get(`${this.baseUrl}/${path}`);
        return response.status === 200 ? response.data : null;
    }
}
