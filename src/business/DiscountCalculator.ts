import { Rule } from "../models/Rule";
import { Game } from "../models/Game";
import { countMatches } from "./RuleMatcher";

export function applyDiscounts(
    rules: Rule[],
    store: Game[],
    library: Game[]
): Game[] {
    return store.map((storeGame) => ({
        ...storeGame,
        price: calculateNewPrice(rules, storeGame, library)
    }));
}

function calculateNewPrice(
    rules: Rule[],
    game: Game,
    library: Game[]
): number {
    const percentage = calculatePercentage(rules, game, library);

    return game.price - (game.price * percentage / 100);
}

function calculatePercentage(
    rules: Rule[],
    game: Game,
    library: Game[]
): number {
    const percentages = rules.map((rule) => {
        const matchCount = countMatches(rule, game, library) || 0;

        return Math.min(matchCount * rule.percentage, rule.maxPercentage);
    }).sort();

    return percentages.length ? percentages[percentages.length - 1] : 0;
}

