import {ApiJokeRepository} from "@/src/data/repository/joke_repository";
import {JokeGetUseCase} from "@/src/domain/use_case/joke_get_use_case";
import {OfflineHistoryRepository} from "@/src/data/repository/history_repository";
import {HistoryGetUseCase} from "@/src/domain/use_case/history_get_use_case";
import {HistoryAddUseCase} from "@/src/domain/use_case/history_add_use_case";
import {OfflineCategoryRepository} from "@/src/data/repository/category_repository";
import {CategoryGetUseCase} from "@/src/domain/use_case/category_get_use_case";
import {CategorySetUseCase} from "@/src/domain/use_case/category_set_use_case";
import {EncryptedPreferences} from "@/src/data/source/prefs/encrypted_prefs";

const prefsDatasource = new EncryptedPreferences();

const jokeRepo = new ApiJokeRepository();
const historyRepo = new OfflineHistoryRepository(prefsDatasource);
const categoryRepo = new OfflineCategoryRepository(prefsDatasource);

export const jokeGetUseCase = new JokeGetUseCase(jokeRepo);
export const historyGetUseCase = new HistoryGetUseCase(historyRepo);
export const historyAddUseCase = new HistoryAddUseCase(historyRepo);
export const categoryGetUseCase = new CategoryGetUseCase(categoryRepo);
export const categorySetUseCase = new CategorySetUseCase(categoryRepo);
