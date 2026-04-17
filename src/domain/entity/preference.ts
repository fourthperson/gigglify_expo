import {Category} from "@/src/domain/entity/category";

export interface Preference {
    categories: Category[];
    blacklist: string[];
}