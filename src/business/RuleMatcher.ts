import { Game } from "../models/Game";
import { ContainsTagOption, Rule, RuleType } from "../models/Rule";

export function countMatches(
    rule: Rule,
    storeGame: Game,
    library: Game[]
): number {
    return library.reduce((currentMatches, libraryGame) => {
        const matchesRule = storeGame.studioId === rule.studioId
            && (sameStudio(rule.type, storeGame, libraryGame)
            || sameFranchise(rule.type, storeGame, libraryGame)
            || containsTag(rule.type, rule.studioId, libraryGame, rule.options as ContainsTagOption))

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
