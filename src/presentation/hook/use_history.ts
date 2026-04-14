import {useCallback, useState} from "react";
import {Joke} from "@/src/domain/entity/joke";
import {historyGetUseCase} from "@/src/di";

export const useHistory = () => {
    const [data, setData] = useState<{ jokes: Joke[], dateFormat: string }>({
        jokes: [], dateFormat: 'DD MMM YYYY h:mm A',
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchHistory = useCallback(async () => {
        setIsLoading(true);

        const history: Joke[] = await historyGetUseCase.execute();
        setData({jokes: history, dateFormat: 'DD MMM YYYY h:mm A'});

        setIsLoading(false);
    }, []);

    return {...data, isLoading, fetchHistory};
}