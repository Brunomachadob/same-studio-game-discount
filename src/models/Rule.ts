export enum RuleType {
    SAME_STUDIO,
    SAME_FRANCHISE,
    SEQUEL,
    CONTAINS_TAG,
};

export interface Rule {
    id: string;
    studioId: string;
    type: RuleType;
    percentage: number;
    maxPercentage: number;
    options?: ContainsTagOption
};

export interface ContainsTagOption {
    tags: string[];
};