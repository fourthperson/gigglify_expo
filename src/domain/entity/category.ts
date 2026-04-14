export interface Category {
    id: string;
    translationKey: string;
}

export const AVAILABLE_CATEGORIES: Category[] = [
    {id: 'Programming', translationKey: 'cat_programming'},
    {id: 'Miscellaneous', translationKey: 'cat_misc'},
    {id: 'Dark', translationKey: 'cat_dark'},
    {id: 'Pun', translationKey: 'cat_pun'},
    {id: 'Spooky', translationKey: 'cat_spooky'},
    {id: 'Christmas', translationKey: 'cat_christmas'},
];

export const ANY_CATEGORY_ID = 'Any';