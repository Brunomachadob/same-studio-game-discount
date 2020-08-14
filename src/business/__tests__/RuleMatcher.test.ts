import { countMatches } from "../RuleMatcher";
import { Rule, RuleType } from "../../models/Rule";
import { Game } from "../../models/Game";

describe('RuleMatcher', () => {
    const sameStudioRule: Rule = {
        id: '1',
        type: RuleType.SAME_STUDIO,
        maxPercentage: 10,
        percentage: 1
    };

    const sameFranchiseRule: Rule = {
        id: '2',
        type: RuleType.SAME_FRANCHISE,
        maxPercentage: 10,
        percentage: 1
    };

    const openWorldTagRule: Rule = {
        id: '3',
        type: RuleType.CONTAINS_TAG,
        maxPercentage: 10,
        percentage: 1,
        options: {
            studioId: '1',
            tags: ['open-world'],
        },
    };

    const matrix1: Game = { id: '1', name: 'Matrix 1', price: 10, studioId: '1', franchise: 'matrix', tags: ['rpg'] };
    const matrix2: Game = { id: '2', name: 'Matrix 2', price: 10.5, studioId: '1', franchise: 'matrix', tags: ['rpg', 'open-world'] };
    const matrix3: Game = { id: '3', name: 'Matrix 3', price: 20, studioId: '1', franchise: 'matrix', tags: ['rpg', 'open-world'] };

    const elderScrolls1: Game = { id: '4', name: 'Elder Scrolls', price: 40, studioId: '2', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] };
    const elderScrolls2: Game = { id: '5', name: 'Elder Scrolls 2', price: 50, studioId: '2', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] };
    const oblivion: Game = { id: '5', name: 'Oblivion', price: 50, studioId: '2', franchise: 'oblivion', tags: ['rpg', 'open-world'] };

    describe('SAME_STUDIO', () => {
        it('should return 0 since the library is empty', () => {
            const matches = countMatches(sameStudioRule, matrix1, []);
            expect(matches).toEqual(0);
        });

        it('should return 0 since the games in the library are not from same studio', () => {
            const matches = countMatches(sameStudioRule, matrix1, [elderScrolls1]);
            expect(matches).toEqual(0);
        });

        it('should return 2 since 2 the games in the library are from the same studio', () => {
            const matches = countMatches(sameStudioRule, matrix1, [matrix2, matrix2, elderScrolls1]);
            expect(matches).toEqual(2);
        });
    });

    describe('SAME_FRANCHISE', () => {
        it('should return 0 since the library is empty', () => {
            const matches = countMatches(sameFranchiseRule, matrix1, []);
            expect(matches).toEqual(0);
        });

        it('should return 0 since the games in the library are not from same studio or franchise', () => {
            const matches = countMatches(sameFranchiseRule, elderScrolls1, [matrix2, oblivion]);
            expect(matches).toEqual(0);
        });

        it('should return 2 since 2 the games in the library are from the same studio and franchise', () => {
            const matches = countMatches(sameFranchiseRule, matrix1, [matrix2, matrix3, elderScrolls1]);
            expect(matches).toEqual(2);
        });
    });

    describe('CONTAINS_TAG', () => {
        it('should return 0 since the library is empty', () => {
            const matches = countMatches(openWorldTagRule, matrix1, []);
            expect(matches).toEqual(0);
        });

        it('should return 0 since the games in the library are not from same studio or contain the same tag', () => {
            const matches = countMatches(openWorldTagRule, matrix3, [matrix1]);
            expect(matches).toEqual(0);
        });

        it('should return 1 since 1 the game in the library are from the same studio and same tag', () => {
            const matches = countMatches(openWorldTagRule, matrix2, [matrix1, matrix3, elderScrolls1, elderScrolls2]);
            expect(matches).toEqual(1);
        });
    });
});
