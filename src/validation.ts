import { CustomErrorKeys, CustomErrors, ValidationResult, ValidationRules, ValidationType } from "./types";

const getErrorMessage = (customErrors: CustomErrors, key: CustomErrorKeys, defaultMessage: string): string => {
    return customErrors?.[key] || defaultMessage;
};

export const isValid = (
    value: any,
    type: ValidationType,
    rules: ValidationRules = {}
): ValidationResult => {
    const errors: string[] = [];
    const customErrors = rules.customErrors || {};

    if (value === null || value === undefined) {
        errors.push(getErrorMessage(customErrors, CustomErrorKeys.TYPE_MISMATCH, `Value is ${value}.`));
        return { isValid: false, errors };
    }

    if (
        (type !== ValidationType.ARRAY && type !== ValidationType.OBJECT && typeof value !== type) ||
        (type === ValidationType.ARRAY && !Array.isArray(value)) ||
        (type === ValidationType.OBJECT && (typeof value !== 'object' || Array.isArray(value)))

    ) {
        errors.push(getErrorMessage(
            customErrors,
            CustomErrorKeys.TYPE_MISMATCH,
            `Value type does not matches.`
        ));
        return { isValid: false, errors };
    }

    switch (type) {
        case ValidationType.STRING: {
            const trimmedValue = value.trim();
            if (!rules.allowEmpty && trimmedValue.length === 0) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.ALLOW_EMPTY, 'Empty strings are not allowed.')
                );
            }
            if (rules.minLength !== undefined && trimmedValue.length < rules.minLength) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MIN_LENGTH, `String length must be at least ${rules.minLength}.`)
                );
            }
            if (rules.maxLength !== undefined && trimmedValue.length > rules.maxLength) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MAX_LENGTH, `String length must not exceed ${rules.maxLength}.`)
                );
            }
            if (rules.regexPattern && !rules.regexPattern.test(trimmedValue)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.REGEX_PATTERN, 'String does not match the required pattern.')
                );
            }
            if (rules.allowedValues && !rules.allowedValues.includes(value)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.ALLOWED_VALUES, 'Value is not in the allowed values.')
                );
            }
            if (rules.prohibitedValues && rules.prohibitedValues.includes(value)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.PROHIBITED_VALUES, 'Value is in the prohibited values.')
                );
            }
            break;
        }

        case ValidationType.NUMBER:
        case ValidationType.BIGINT: {
            if (type === ValidationType.NUMBER && isNaN(value)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.TYPE_MISMATCH, 'Value is not a valid number.')
                );
                break;
            }
            if (rules.minValue !== undefined && value < rules.minValue) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MIN_VALUE, `Value must be at least ${rules.minValue}.`)
                );
            }
            if (rules.maxValue !== undefined && value > rules.maxValue) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MAX_VALUE, `Value must not exceed ${rules.maxValue}.`)
                );
            }
            if (rules.prohibitedValues && rules.prohibitedValues.includes(value)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.PROHIBITED_VALUES, 'Value is in the prohibited values.')
                );
            }
            if (rules.allowedValues && !rules.allowedValues.includes(value)) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.ALLOWED_VALUES, 'Value is not in the allowed values.')
                );
            }
            break;
        }

        case ValidationType.ARRAY: {
            if (!rules.allowEmpty && value.length === 0) {
                errors.push(getErrorMessage(customErrors, CustomErrorKeys.ALLOW_EMPTY, 'Empty arrays are not allowed.'));
            }
            if (rules.minLength !== undefined && value.length < rules.minLength) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MIN_LENGTH, `Array length must be at least ${rules.minLength}.`)
                );
            }
            if (rules.maxLength !== undefined && value.length > rules.maxLength) {
                errors.push(
                    getErrorMessage(customErrors, CustomErrorKeys.MAX_LENGTH, `Array length must not exceed ${rules.maxLength}.`)
                );
            }
            break;
        }

        case ValidationType.OBJECT: {
            if (!rules.allowEmpty && Object.keys(value).length === 0) {
                errors.push(getErrorMessage(customErrors, CustomErrorKeys.ALLOW_EMPTY, 'Empty objects are not allowed.'));
            }
            if (rules.requiredFields) {
                for (const field of rules.requiredFields) {
                    if (!value.hasOwnProperty(field)) {
                        errors.push(
                            getErrorMessage(
                                customErrors,
                                CustomErrorKeys.REQUIRED_FIELDS,
                                `Missing required field: ${field}.`
                            )
                        );
                    }
                }
            }
            break;
        }
    }

    // Apply custom validator
    if (rules.customValidator) {
        try {
            if (!rules.customValidator(value)) {
                errors.push(getErrorMessage(customErrors, CustomErrorKeys.CUSTOM_VALIDATOR, 'Custom validation failed.'));
            }
        } catch (e: any) {
            errors.push(getErrorMessage(customErrors, CustomErrorKeys.CUSTOM_VALIDATOR, `Custom validator threw an error: ${e.message}`));
        }
    }

    return { isValid: errors.length === 0, errors };
};
