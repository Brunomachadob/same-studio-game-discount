import { Game } from "../models/Game";
import { ContainsTagOption, Rule, RuleType } from "../models/Rule";

export function countMatches(
    rule: Rule,
    storeGame: Game,
    library: Game[]
): number {
    if (storeGame.studioId !== rule.studioId) {
        return 0;
    }

    if (rule.type === RuleType.SEQUEL) {
        if (!storeGame.prequelId) {
            return 0;
        }

        const prequelGame = library.find((game) => game.id === storeGame.prequelId);

        return prequelGame ? 1 : 0
    }

    return library.reduce((currentMatches, libraryGame) => {
        const matchesRule = sameStudio(rule.type, storeGame, libraryGame)
            || sameFranchise(rule.type, storeGame, libraryGame)
            || containsTag(rule.type, rule.studioId, libraryGame, rule.options as ContainsTagOption)

        return currentMatches + (matchesRule ? 1 : 0)  
    }, 0);
}

function sameStudio(ruleType: RuleType, gameA: Game, gameB: Game) {
    return ruleType === RuleType.SAME_STUDIO && gameA.studioId === gameB.studioId
}

function sameFranchise(ruleType: RuleType, gameA: Game, gameB: Game) {
    return ruleType === RuleType.SAME_FRANCHISE 
        && sameStudio(RuleType.SAME_STUDIO, gameA, gameB) 
        && gameA.franchise === gameB.franchise;
}

function containsTag(ruleType: RuleType, studioId: string, game: Game, options: ContainsTagOption) {
    return ruleType === RuleType.CONTAINS_TAG
        && game.studioId === studioId
        && game.tags.findIndex((gameTag) => options.tags.includes(gameTag)) > -1;
}
