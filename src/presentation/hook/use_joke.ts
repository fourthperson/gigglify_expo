import {useCallback, useState} from "react";
import {Joke} from "@/src/domain/entity/joke";
import {ANY_CATEGORY_ID, Category} from "@/src/domain/entity/category";
import {historyAddUseCase, jokeGetUseCase, preferenceGetUseCase} from "@/src/di";
import {Preference} from "@/src/domain/entity/preference";

export const useJoke = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchJoke = useCallback(async () => {
        setIsLoading(true);
        try {
            const preference: Preference = await preferenceGetUseCase.execute();
            let path: string | undefined = undefined;
            if (preference.categories.length > 0) {
                path = preference.categories.map((c: Category) => c.id).join(',');
            }
            if (!path) {
                path = ANY_CATEGORY_ID;
            }
            if (preference.blacklist.length > 0) {
                path = `${path}?blacklistFlags=${preference.blacklist.join(',')}`;
            }
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
