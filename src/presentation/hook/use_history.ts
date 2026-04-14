import {useCallback, useState} from "react";
import {Joke} from "@/src/domain/entity/joke";
import {historyGetUseCase} from "@/src/di";
import {getSystemDateFormat} from "@/src/presentation/util/functions";

export const useHistory = () => {
    const [data, setData] = useState<{ jokes: Joke[], dateFormat: string }>({
        jokes: [], dateFormat: 'DD MMM YYYY h:mm A',
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchHistory = useCallback(async () => {
        setIsLoading(true);

        const history: Joke[] = await historyGetUseCase.execute();
        const dateFormat: string = getSystemDateFormat();

        setData({jokes: history, dateFormat: dateFormat});

        setIsLoading(false);
    }, []);

    return {...data, isLoading, fetchHistory};
}