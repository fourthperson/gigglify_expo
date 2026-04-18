import {useEffect, useState} from "react";
import {ANY_CATEGORY_ID, AVAILABLE_CATEGORIES, Category} from "@/src/domain/entity/category";
import {preferenceGetUseCase, preferenceSetUseCase} from "@/src/di";
import {Preference} from "@/src/domain/entity/preference";

export const usePreferences = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [blacklist, setBlacklist] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        preferenceGetUseCase.execute().then((preference: Preference) => {
            setSelectedCategories(preference.categories);
            setBlacklist(preference.blacklist);
        });
        setIsLoading(false);
    }, []);

    const onCategoryToggle = async (category: Category) => {
        const nextSelection: Category[] = resolveCategorySelection(selectedCategories, category);
        const preferences: Preference = {
            categories: nextSelection,
            blacklist: blacklist
        } as Preference;
        await preferenceSetUseCase.execute(preferences);
        setSelectedCategories(nextSelection);
    };

    const isCategorySelected = (id: string) => {
        if (id === 'Any') return selectedCategories.length === 0;
        return selectedCategories.some(c => c.id === id);
    };

    const onBlacklistToggle = async (id: string) => {
        const index: number = blacklist.indexOf(id);
        let updated: string[];
        if (index > -1) {
            updated = blacklist.filter((cat: string) => cat !== id);
        } else {
            updated = [...blacklist, id];
        }
        const preference: Preference = {
            categories: selectedCategories,
            blacklist: updated
        } as Preference;
        await preferenceSetUseCase.execute(preference);
        setBlacklist(updated);
    };

    const isBlacklisted = (value: string): boolean => {
        return blacklist.includes(value);
    };

    return {
        selectedCategories,
        blacklist,
        onCategoryToggle,
        onBlacklistToggle,
        isCategorySelected,
        isBlacklisted,
        isLoading
    };
};

export const resolveCategorySelection = (
    currentSelection: Category[],
    toggled: Category
): Category[] => {
    // 1. If 'Any' is toggled, it clears everything
    if (toggled.id === ANY_CATEGORY_ID) {
        return []; // Empty array represents "Any" internally
    }

    // 2. Toggle the specific category
    const isAlreadySelected = currentSelection.some(c => c.id === toggled.id);
    let newSelection = isAlreadySelected
        ? currentSelection.filter(c => c.id !== toggled.id)
        : [...currentSelection, toggled];

    // 3. Rule: If all specific categories are selected OR none are left, return empty (Any)
    const allSelected = AVAILABLE_CATEGORIES.every(cat =>
        newSelection.some(s => s.id === cat.id)
    );

    if (allSelected || newSelection.length === 0) {
        return [];
    }

    return newSelection;
};