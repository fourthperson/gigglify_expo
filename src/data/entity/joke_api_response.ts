export interface JokeApiResponse {
    type: 'single' | 'twopart';
    joke?: string;
    setup?: string;
    delivery?: string;
    category: string;
    id: number;
    safe: boolean;
    flags: any;
}