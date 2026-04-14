import {useEffect, useState} from "react";
import {ANY_CATEGORY_ID, AVAILABLE_CATEGORIES, Category} from "@/src/domain/entity/category";
import {categoryGetUseCase, categorySetUseCase} from "@/src/di";

export const useCategories = () => {
    const [selected, setSelected] = useState<Category[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        categoryGetUseCase.execute().then(setSelected);
        setIsLoading(false);
    }, []);

    const handleToggle = async (category: Category) => {
        setIsLoading(true);
        const nextSelection: Category[] = resolveCategorySelection(selected, category);
        await categorySetUseCase.execute(nextSelection);
        setSelected(nextSelection);
        setIsLoading(false);
    };

    const isSelected = (id: string) => {
        if (id === 'Any') return selected.length === 0;
        return selected.some(c => c.id === id);
    };

    return {selected, handleToggle, isSelected, isLoading};
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