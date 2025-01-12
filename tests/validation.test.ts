import { ValidationType } from '../src/types';
import { isValid } from '../src/validation';

describe('isValid', () => {
    // STRING validation
    describe('STRING validation', () => {
        it('validates a string with minimum length', () => {
            const result = isValid('Hello', ValidationType.STRING, { minLength: 5 });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a string shorter than minLength', () => {
            const result = isValid('Hi', ValidationType.STRING, { minLength: 5 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('String length must be at least 5.');
        });

        it('validates a string with maximum length', () => {
            const result = isValid('Hello', ValidationType.STRING, { maxLength: 5 });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a string longer than maxLength', () => {
            const result = isValid('HelloWorld', ValidationType.STRING, { maxLength: 5 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('String length must not exceed 5.');
        });

        it('validates an empty string when allowEmpty is true', () => {
            const result = isValid('', ValidationType.STRING, { allowEmpty: true });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for an empty string when allowEmpty is false', () => {
            const result = isValid('', ValidationType.STRING, { allowEmpty: false });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Empty strings are not allowed.');
        });

        it('validates a string matching a regex pattern', () => {
            const result = isValid('abc123', ValidationType.STRING, { regexPattern: /^[a-z]+\d+$/ });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a string not matching a regex pattern', () => {
            const result = isValid('123abc', ValidationType.STRING, { regexPattern: /^[a-z]+\d+$/ });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('String does not match the required pattern.');
        });

        it('validates a string within allowed values', () => {
            const result = isValid('allowed', ValidationType.STRING, { allowedValues: ['allowed', 'permitted'] });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a string not within allowed values', () => {
            const result = isValid('forbidden', ValidationType.STRING, { allowedValues: ['allowed', 'permitted'] });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value is not in the allowed values.');
        });

        it('fails validation for a string within prohibited values', () => {
            const result = isValid('forbidden', ValidationType.STRING, { prohibitedValues: ['forbidden', 'restricted'] });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value is in the prohibited values.');
        });
    });

    // NUMBER validation
    describe('NUMBER validation', () => {
        it('validates a number within range', () => {
            const result = isValid(10, ValidationType.NUMBER, { minValue: 5, maxValue: 15 });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a number below minValue', () => {
            const result = isValid(3, ValidationType.NUMBER, { minValue: 5 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value must be at least 5.');
        });

        it('fails validation for a number above maxValue', () => {
            const result = isValid(20, ValidationType.NUMBER, { maxValue: 15 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value must not exceed 15.');
        });

        it('fails validation for a non-number value', () => {
            const result = isValid('not a number', ValidationType.NUMBER);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value type does not matches.');
        });

        it('validates a number within allowed values', () => {
            const result = isValid(10, ValidationType.NUMBER, { allowedValues: [5, 10, 15] });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a number not within allowed values', () => {
            const result = isValid(20, ValidationType.NUMBER, { allowedValues: [5, 10, 15] });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value is not in the allowed values.');
        });

        it('fails validation for a number within prohibited values', () => {
            const result = isValid(10, ValidationType.NUMBER, { prohibitedValues: [10, 20, 30] });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value is in the prohibited values.');
        });

        it('fails validation for a not a number', () => {
            const result = isValid(Number("Shiva"), ValidationType.NUMBER);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value is not a valid number.');
        });
    });

    // BIGINT validation
    describe('BIGINT validation', () => {
        it('validates a bigint within range', () => {
            const result = isValid(10n, ValidationType.BIGINT, { minValue: 5n, maxValue: 15n });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a bigint below minValue', () => {
            const result = isValid(3n, ValidationType.BIGINT, { minValue: 5n });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value must be at least 5.');
        });

        it('fails validation for a bigint above maxValue', () => {
            const result = isValid(20n, ValidationType.BIGINT, { maxValue: 15n });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value must not exceed 15.');
        });
    });

    // ARRAY validation
    describe('ARRAY validation', () => {
        it('validates an array with valid length', () => {
            const result = isValid([1, 2, 3], ValidationType.ARRAY, { minLength: 2, maxLength: 5 });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for an array shorter than minLength', () => {
            const result = isValid([1], ValidationType.ARRAY, { minLength: 2 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Array length must be at least 2.');
        });

        it('fails validation for an array longer than maxLength', () => {
            const result = isValid([1, 2, 3, 4, 5, 6], ValidationType.ARRAY, { maxLength: 5 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Array length must not exceed 5.');
        });
    });

    // OBJECT validation
    describe('OBJECT validation', () => {
        it('validates an object with required fields', () => {
            const result = isValid({ name: 'John', age: 30 }, ValidationType.OBJECT, { requiredFields: ['name', 'age'] });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for an object with invalid value format', () => {
            const result = isValid(["shiva"], ValidationType.OBJECT);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value type does not matches.');
        });

        it('fails validation for an object missing required fields', () => {
            const result = isValid({ name: 'John' }, ValidationType.OBJECT, { requiredFields: ['name', 'age'] });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Missing required field: age.');
        });

        it('validates an object with a custom validator', () => {
            const result = isValid({ name: 'John' }, ValidationType.OBJECT, { customValidator: (obj) => obj.name === 'John' });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for an object not meeting custom validator criteria', () => {
            const result = isValid({ name: 'Doe' }, ValidationType.OBJECT, { customValidator: (obj) => obj.name === 'John' });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Custom validation failed.');
        });
    });

    // BOOLEAN validation
    describe('BOOLEAN validation', () => {
        it('validates a boolean value', () => {
            const result = isValid(true, ValidationType.BOOLEAN);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a non-boolean value', () => {
            const result = isValid('true', ValidationType.BOOLEAN);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value type does not matches.');
        });
    });

    // SYMBOL validation
    describe('SYMBOL validation', () => {
        it('validates a symbol value', () => {
            const result = isValid(Symbol('sym'), ValidationType.SYMBOL);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a non-symbol value', () => {
            const result = isValid('symbol', ValidationType.SYMBOL);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Value type does not matches.');
        });
    });

    // Custom Validator
    describe('Custom validation', () => {
        it('validates a value with a custom validator', () => {
            const result = isValid(10, ValidationType.NUMBER, { customValidator: (val) => val % 2 === 0 });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('fails validation for a value not meeting custom validator criteria', () => {
            const result = isValid(9, ValidationType.NUMBER, { customValidator: (val) => val % 2 === 0 });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Custom validation failed.');
        });
    });
});
