import {Preference} from "@/src/domain/entity/preference";

export interface PreferenceRepository {
    getPreference(): Promise<Preference>;

    setPreference(preference: Preference): Promise<void>;
}