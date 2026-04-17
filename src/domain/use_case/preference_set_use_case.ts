import {PreferenceRepository} from "@/src/domain/repository/preference_repository";
import {Preference} from "@/src/domain/entity/preference";

export class PreferenceSetUseCase {
    constructor(private repository: PreferenceRepository) {
    }

    async execute(preference: Preference): Promise<void> {
        await this.repository.setPreference(preference);
    }
}