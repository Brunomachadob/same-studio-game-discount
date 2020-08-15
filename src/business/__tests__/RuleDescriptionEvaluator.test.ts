import { RuleType } from "../../models/Rule";
import { evaluateRuleDescription, evaluateDiscountDescription } from "../RuleDescriptionEvaluator";

describe('RuleDescriptionEvaluator', () => {

    describe('rule description', () => {
        it('should return right description for SEQUEL', () => {
            const description = evaluateRuleDescription({
                id: '1',
                type: RuleType.SEQUEL,
                studioId: '1',
                percentage: 1,
                maxPercentage: 10,
            });
    
            expect(description).toEqual('1% discount if you own the prequel of the game')
        });
    
        it('should return right description for SAME_STUDIO', () => {
            const description = evaluateRuleDescription({
                id: '1',
                type: RuleType.SAME_STUDIO,
                studioId: '1',
                percentage: 1,
                maxPercentage: 10,
            });
    
            expect(description).toEqual('1% discount per game of the same studio you own, up to 10%')
        });
    
        it('should return right description for SAME_FRANCHISE', () => {
            const description = evaluateRuleDescription({
                id: '1',
                type: RuleType.SAME_FRANCHISE,
                studioId: '1',
                percentage: 1,
                maxPercentage: 10,
            });
    
            expect(description).toEqual('1% discount per game of the same studio and franchise you own, up to 10%')
        });
    
        it('should return right description for CONTAINS_TAG', () => {
            const description = evaluateRuleDescription({
                id: '1',
                type: RuleType.CONTAINS_TAG,
                studioId: '1',
                percentage: 1,
                maxPercentage: 10,
                options: {
                    tags: ['1', '2'],
                },
            });
    
            expect(description).toEqual('1% discount per game of the same studio and with tags \'1 or 2\' you own, up to 10%')
        });
    });

    describe('info description', () => {
        it('should return right info description for SEQUEL', () => {
            const description = evaluateDiscountDescription(10, 1, RuleType.SEQUEL);
    
            expect(description).toEqual('10% discount because you own the prequel of this game')
        });
    
        it('should return right info description for SAME_STUDIO', () => {
            const description = evaluateDiscountDescription(10, 2, RuleType.SAME_STUDIO);
    
            expect(description).toEqual('10% discount because you own 2 games of the same studio')
        });

        it('should return right info description for SAME_FRANCHISE', () => {
            const description = evaluateDiscountDescription(10, 2, RuleType.SAME_FRANCHISE);
    
            expect(description).toEqual('10% discount because you own 2 games of the same franchise')
        });

        it('should return right info description for SAME_FRANCHISE', () => {
            const description = evaluateDiscountDescription(50, 2, RuleType.CONTAINS_TAG, { tags: ['1', '2'] });
    
            expect(description).toEqual('50% discount because you own 2 games with the tags \'1 or 2\'')
        });
    });
});
