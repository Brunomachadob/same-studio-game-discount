import { Game } from '../models/Game';

export const ALL_GAMES: Game[] = [
    { id: '1', name: 'Matrix 1', price: 10, studioId: 'Universal', franchise: 'matrix', tags: ['rpg'] },
    { id: '2', name: 'Matrix 2', price: 10.5, studioId: 'Universal', franchise: 'matrix', tags: ['rpg', 'open-world'] },
    { id: '3', name: 'Matrix 3', price: 20, studioId: 'Universal', franchise: 'matrix', tags: ['rpg', 'open-world'] },

    { id: '4', name: 'Elder Scrolls', price: 40, studioId: 'Bethesda', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] },
    { id: '5', name: 'Elder Scrolls 2', price: 50, studioId: 'Bethesda', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] },
    { id: '6', name: 'Elder Scrolls 3', price: 60, studioId: 'Bethesda', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] },
];
