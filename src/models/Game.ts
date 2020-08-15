export interface Game {
    id: string;
    name: string;
    price: number;
    studioId: string;
    franchise: string;
    prequelId?: string;
    tags: string[];
};