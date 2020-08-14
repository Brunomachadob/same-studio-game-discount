import { RuleType, Rule } from "../models/Rule";

export function evaluateRuleDescription(rule: Rule) {
    switch(rule.type) {
        case RuleType.SAME_STUDIO:
            return `${rule.percentage}% discount per game of the same studio you own, up to ${rule.maxPercentage}%`;
        case RuleType.SAME_FRANCHISE:
            return `${rule.percentage}% discount per game of the same studio and franchise you own, up to ${rule.maxPercentage}%`;
        case RuleType.CONTAINS_TAG:
            return `${rule.percentage}% discount per game of the same studio and with tags '${rule.options?.tags?.join(' or ')}' you own, up to ${rule.maxPercentage}%`;
    }
}
