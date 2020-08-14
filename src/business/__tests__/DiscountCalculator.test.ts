import { applyDiscounts } from "../DiscountCalculator";
import * as RuleMatcher from "../RuleMatcher";
import { Game } from "../../models/Game";
import { Rule, RuleType } from "../../models/Rule";

describe('DiscountCalculator', () => {
    const sameStudioRule: Rule = {
        id: '1',
        type: RuleType.SAME_STUDIO,
        maxPercentage: 10,
        percentage: 1
    };

    const matrix1: Game = { id: '1', name: 'Matrix 1', price: 10, studioId: '1', franchise: 'matrix', tags: ['rpg'] };
    const matrix2: Game = { id: '2', name: 'Matrix 2', price: 10.5, studioId: '1', franchise: 'matrix', tags: ['rpg', 'open-world'] };
    
    const elderScrolls1: Game = { id: '4', name: 'Elder Scrolls', price: 40, studioId: '2', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] };
    const elderScrolls2: Game = { id: '5', name: 'Elder Scrolls 2', price: 50, studioId: '2', franchise: 'elder-scrolls', tags: ['rpg', 'open-world'] };
    
    beforeEach(() => jest.resetAllMocks())
    
    it('should not apply any discounts as the rules are empty', () => {
        const store = [matrix1, matrix2]
        const storeWithDiscounts = applyDiscounts([], store, [elderScrolls1, elderScrolls2]);

        expect(storeWithDiscounts).toEqual(store);
    });

    it('should not apply any discounts if the match count is 0', () => {
        jest.spyOn(RuleMatcher, 'countMatches').mockImplementationOnce(() => 0);

        const store = [matrix1, matrix2];
        const library = [elderScrolls1, elderScrolls2];

        const storeWithDiscounts = applyDiscounts([sameStudioRule], store, library);

        expect(storeWithDiscounts).toEqual(store);
    });

    it('should apply discounts according to the amount of matches', () => {
        jest.spyOn(RuleMatcher, 'countMatches').mockImplementationOnce(() => 10);

        const store = [matrix1];
        const library = [elderScrolls1];

        const storeWithDiscounts = applyDiscounts([sameStudioRule], store, library);

        expect(storeWithDiscounts).toEqual([{
            ...matrix1,
            price: 9
        }]);
    });

    it('should apply the biggest discount according to the rules percentages and matches', () => {
        jest.spyOn(RuleMatcher, 'countMatches')
            .mockImplementationOnce(() => 5)
            .mockImplementationOnce(() => 20);

        const store = [matrix1];
        const library = [elderScrolls1];

        const rule1: Rule = {
            id: '1',
            type: RuleType.SAME_STUDIO,
            maxPercentage: 50,
            percentage: 2
        };

        const rule2: Rule = {
            id: '2',
            type: RuleType.SAME_STUDIO,
            maxPercentage: 15,
            percentage: 1
        };

        const storeWithDiscounts = applyDiscounts([rule1, rule2], store, library);

        expect(storeWithDiscounts).toEqual([{
            ...matrix1,
            price: 8.5
        }]);
    });
});
