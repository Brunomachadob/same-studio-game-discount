import { RuleType } from "../../models/Rule";
import { evaluateRuleDescription } from "../RuleDescriptionEvaluator";

describe('RuleDescriptionEvaluator', () => {

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
