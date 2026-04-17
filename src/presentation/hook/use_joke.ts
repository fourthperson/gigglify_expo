import {useCallback, useState} from "react";
import {Joke} from "@/src/domain/entity/joke";
import {categoryGetUseCase, historyAddUseCase, jokeGetUseCase} from "@/src/di";
import {Category} from "@/src/domain/entity/category";

export const useJoke = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchJoke = useCallback(async () => {
        setIsLoading(true);
        try {
            const categories: Category[] = await categoryGetUseCase.execute();
            let path: string | undefined = undefined;
            if (categories.length !== 0) {
                path = categories.map((c: Category) => c.id).join(',');
            }
            console.warn(path);
            const result: Joke = await jokeGetUseCase.execute(path);
            await historyAddUseCase.execute(result);
            setJoke(result);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {joke, isLoading, fetchJoke};
}
