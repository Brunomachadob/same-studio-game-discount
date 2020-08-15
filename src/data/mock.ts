import { Game } from '../models/Game';
import { Rule, RuleType } from '../models/Rule';

const BETHESDA = 'Bethesda';
const SANTA_MONICA = 'Santa Monica';

export const ALL_GAMES: Game[] = [
    { id: '1', name: 'God of War', price: 10, studioId: SANTA_MONICA, franchise: 'gow', tags: ['rpg'] },
    { id: '2', name: 'God of War 2', price: 10.5, studioId: SANTA_MONICA, franchise: 'gow', prequelId: '1', tags: ['rpg', 'open-world'] },
    { id: '3', name: 'God of War 3', price: 20, studioId: SANTA_MONICA, franchise: 'gow', prequelId: '2', tags: ['rpg', 'open-world'] },

    { id: '4', name: 'Elder Scrolls', price: 40, studioId: BETHESDA, franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] },
    { id: '5', name: 'Elder Scrolls 2', price: 50, studioId: BETHESDA, franchise: 'elder-scrolls', prequelId: '4', tags: ['rpg', 'open-world'] },
    { id: '6', name: 'Elder Scrolls 3', price: 60, studioId: BETHESDA, franchise: 'elder-scrolls', prequelId: '5', tags: ['rpg', 'open-world'] },
];

export const RULES: Rule[] = [
    { id: '1', type: RuleType.SAME_STUDIO, percentage: 5, maxPercentage: 10, studioId: SANTA_MONICA },
    { id: '2', type: RuleType.CONTAINS_TAG, percentage: 5, maxPercentage: 15, studioId: BETHESDA, options: { tags: ['open-world'] } },
    { id: '2', type: RuleType.SEQUEL, percentage: 50, maxPercentage: 50, studioId: BETHESDA },
];
