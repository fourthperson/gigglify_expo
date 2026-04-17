import {PreferenceRepository} from "@/src/domain/repository/preference_repository";
import {Preference} from "@/src/domain/entity/preference";

export class PreferenceGetUseCase {
    constructor(private repository: PreferenceRepository) {
    }

    async execute(): Promise<Preference> {
        return await this.repository.getPreference();
    }
}