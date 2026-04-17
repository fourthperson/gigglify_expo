import {Category} from "@/src/domain/entity/category";
import {Joke} from "@/src/domain/entity/joke";

export interface PrefsDataSource {
    setCategories(categories: Category[]): Promise<void>;

    getCategories(): Promise<Category[]>;

    saveJoke(joke: Joke): Promise<void>

    getHistory(): Promise<Joke[]>;
}
