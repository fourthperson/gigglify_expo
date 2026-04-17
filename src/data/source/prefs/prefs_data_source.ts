import {Category} from "@/src/domain/entity/category";
import {Joke} from "@/src/domain/entity/joke";

export interface PrefsDataSource {
    saveJoke(joke: Joke): Promise<void>

    getHistory(): Promise<Joke[]>;

    setCategories(categories: Category[]): Promise<void>;

    getCategories(): Promise<Category[]>;

    setBlackList(blacklist: string[]): Promise<void>;

    getBlackList(): Promise<string[]>;
}
