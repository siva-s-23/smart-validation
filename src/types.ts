export enum ValidationType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    SYMBOL = 'symbol',
    BIGINT = 'bigint',
    ARRAY = 'array',
    OBJECT = 'object',
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export enum CustomErrorKeys {
    ALLOW_EMPTY = 'allowEmpty',
    MIN_LENGTH = 'minLength',
    MAX_LENGTH = 'maxLength',
    MIN_VALUE = 'minValue',
    MAX_VALUE = 'maxValue',
    REQUIRED_FIELDS = 'requiredFields',
    REGEX_PATTERN = 'regexPattern',
    ALLOWED_VALUES = 'allowedValues',
    PROHIBITED_VALUES = 'prohibitedValues',
    CUSTOM_VALIDATOR = 'customValidator',
    TYPE_MISMATCH = 'typeMismatch',
}

export interface CustomErrors {
    [CustomErrorKeys.ALLOW_EMPTY]?: string;
    [CustomErrorKeys.MIN_LENGTH]?: string;
    [CustomErrorKeys.MAX_LENGTH]?: string;
    [CustomErrorKeys.MIN_VALUE]?: string;
    [CustomErrorKeys.MAX_VALUE]?: string;
    [CustomErrorKeys.REQUIRED_FIELDS]?: string;
    [CustomErrorKeys.REGEX_PATTERN]?: string;
    [CustomErrorKeys.ALLOWED_VALUES]?: string;
    [CustomErrorKeys.PROHIBITED_VALUES]?: string;
    [CustomErrorKeys.CUSTOM_VALIDATOR]?: string;
    [CustomErrorKeys.TYPE_MISMATCH]?: string;
}

export interface ValidationRules {
    allowEmpty?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number | bigint;
    maxValue?: number | bigint;
    customValidator?: (value: any) => boolean;
    requiredFields?: string[];
    regexPattern?: RegExp;
    allowedValues?: any[];
    prohibitedValues?: any[];
    customErrors?: CustomErrors; // Using the defined `CustomErrors` type
}
