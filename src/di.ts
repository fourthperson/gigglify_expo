import axios, {AxiosInstance} from "axios";
import * as AxiosLogger from "axios-logger";
import {ApiJokeRepository} from "@/src/data/repository/joke_repository";
import {JokeGetUseCase} from "@/src/domain/use_case/joke_get_use_case";
import {OfflineHistoryRepository} from "@/src/data/repository/history_repository";
import {HistoryGetUseCase} from "@/src/domain/use_case/history_get_use_case";
import {HistoryAddUseCase} from "@/src/domain/use_case/history_add_use_case";
import {EncryptedPreferences} from "@/src/data/source/prefs/encrypted_prefs";
import {JokeRepository} from "@/src/domain/repository/joke_repository";
import {APiDataSource} from "@/src/data/source/api/api_data_source";
import {JokeApiV2} from "@/src/data/source/api/joke_api_v2";
import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";
import {HistoryRepository} from "@/src/domain/repository/history_repository";
import {PreferenceRepository} from "@/src/domain/repository/preference_repository";
import {OfflinePreferenceRepository} from "@/src/data/repository/preference_repository";
import {PreferenceGetUseCase} from "@/src/domain/use_case/preference_get_use_case";
import {PreferenceSetUseCase} from "@/src/domain/use_case/preference_set_use_case";

const axiosInstance: AxiosInstance = axios.create();
if (__DEV__) {
    axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
    axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
}

const prefsDatasource: PrefsDataSource = new EncryptedPreferences();
const apiDataSource: APiDataSource = new JokeApiV2(axiosInstance);

const jokeRepo: JokeRepository = new ApiJokeRepository(apiDataSource);
const historyRepo: HistoryRepository = new OfflineHistoryRepository(prefsDatasource);
const preferenceRepo: PreferenceRepository = new OfflinePreferenceRepository(prefsDatasource);

export const jokeGetUseCase = new JokeGetUseCase(jokeRepo);
export const historyGetUseCase = new HistoryGetUseCase(historyRepo);
export const historyAddUseCase = new HistoryAddUseCase(historyRepo);
export const preferenceGetUseCase = new PreferenceGetUseCase(preferenceRepo);
export const preferenceSetUseCase = new PreferenceSetUseCase(preferenceRepo);
