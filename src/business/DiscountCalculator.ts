import { Rule } from "../models/Rule";
import { Game, DiscountInfo } from "../models/Game";
import { countMatches } from "./RuleMatcher";
import { evaluateDiscountDescription } from "./RuleDescriptionEvaluator";

export function applyDiscounts(
    rules: Rule[],
    store: Game[],
    library: Game[]
): Game[] {
    return store.map((storeGame) => ({
        ...storeGame,
        discountInfo: calculateDiscountInfo(rules, storeGame, library)
    }));
}

function calculateDiscountInfo(
    rules: Rule[],
    game: Game,
    library: Game[]
): DiscountInfo | undefined {
    const discountInfos: DiscountInfo[] = rules.map((rule) => {
        const matchCount = countMatches(rule, game, library) || 0;
        const percentage = Math.min(matchCount * rule.percentage, rule.maxPercentage);
        const info = evaluateDiscountDescription(percentage, matchCount, rule.type, rule.options);
        const price = game.price - (game.price * percentage / 100)

        return { percentage, info, price };
    })
    .filter((info) => info.percentage > 0)
    .sort((a, b) => a.percentage - b.percentage);

    return discountInfos.length ? discountInfos[discountInfos.length - 1] : undefined;
}

