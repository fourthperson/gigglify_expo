export interface Category {
    id: string;
    translationKey: string;
}

export const AVAILABLE_CATEGORIES: Category[] = [
    {id: 'Programming', translationKey: 'category_programming'},
    {id: 'Miscellaneous', translationKey: 'category_misc'},
    {id: 'Dark', translationKey: 'category_dark'},
    {id: 'Pun', translationKey: 'category_pun'},
    {id: 'Spooky', translationKey: 'category_spooky'},
    {id: 'Christmas', translationKey: 'category_christmas'},
];

export const BLACKLIST_CATEGORIES: string[] = [
    'Religious',
    'Political',
    'Racist',
    'Sexist',
    'Explicit',
    'NSFW',
]

export const ANY_CATEGORY_ID = 'Any';