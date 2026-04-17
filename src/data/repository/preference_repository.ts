import {PreferenceRepository} from "@/src/domain/repository/preference_repository";
import {Preference} from "@/src/domain/entity/preference";
import {PrefsDataSource} from "@/src/data/source/prefs/prefs_data_source";
import {Category} from "@/src/domain/entity/category";

export class OfflinePreferenceRepository implements PreferenceRepository {
    constructor(private prefsDataSource: PrefsDataSource) {
    }

    async getPreference(): Promise<Preference> {
        const categories: Category[] = await this.prefsDataSource.getCategories();
        const blacklist: string[] = await this.prefsDataSource.getBlackList();
        return {
            categories: categories,
            blacklist: blacklist,
        } as Preference;
    }

    async setPreference(preference: Preference): Promise<void> {
        await this.prefsDataSource.setCategories(preference.categories);
        await this.prefsDataSource.setBlackList(preference.blacklist);
    }
}