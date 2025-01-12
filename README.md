
# **Validation Toolkit**

A robust and flexible validation library for JavaScript and TypeScript, providing built-in support for various data types, custom validation rules, and error handling.

---

## **Features**

- **Type validation**: Supports `string`, `number`, `boolean`, `array`, `object`, `bigint`, and more.
- **Rule-based validation**: Easily apply rules like `minLength`, `maxValue`, `allowedValues`, etc.
- **Custom error messages**: Customize validation error messages for better UX.
- **Custom validators**: Extend functionality by defining your own validation logic.
- **Lightweight**: Minimal dependencies and optimized for performance.

---

## **Installation**

Install the package using NPM or Yarn:

```bash
npm install validation-toolkit
```

or

```bash
yarn add validation-toolkit
```

---

## **Usage**

### Import the Library

```typescript
import { isValid, ValidationType } from 'validation-toolkit';
```

### Basic Validation

```typescript
const rules = {
  minLength: 3,
  maxLength: 10,
  allowEmpty: false,
};

const result = isValid('Hello', ValidationType.STRING, rules);

if (result.isValid) {
  console.log('Validation passed!');
} else {
  console.log('Validation failed:', result.errors);
}
```

### Validating Numbers

```typescript
const rules = {
  minValue: 10,
  maxValue: 100,
  allowedValues: [10, 20, 30, 40],
};

const result = isValid(25, ValidationType.NUMBER, rules);

if (!result.isValid) {
  console.error('Validation failed:', result.errors);
}
```

### Validating Objects

```typescript
const rules = {
  requiredFields: ['name', 'age'],
  customErrors: {
    REQUIRED_FIELDS: 'Missing required field.',
  },
};

const result = isValid(
  { name: 'John' },
  ValidationType.OBJECT,
  rules
);

console.log(result.isValid ? 'Valid object!' : result.errors);
```

---

## **API Reference**

### **`isValid(value: any, type: ValidationType, rules: ValidationRules): ValidationResult`**

#### Parameters:
1. **`value`**: The value to be validated.
2. **`type`**: The expected data type. Must be one of the `ValidationType` enum values.
3. **`rules`**: An object defining validation rules and custom error messages.

#### Returns:
- An object with:
  - `isValid`: Boolean indicating if validation passed.
  - `errors`: Array of error messages if validation failed.

---

### **Validation Rules**

| Rule                | Type            | Description                                                                                      |
|---------------------|-----------------|--------------------------------------------------------------------------------------------------|
| `allowEmpty`        | `boolean`       | Whether empty values are allowed (default: `true`).                                             |
| `minLength`         | `number`        | Minimum length for strings or arrays.                                                           |
| `maxLength`         | `number`        | Maximum length for strings or arrays.                                                           |
| `minValue`          | `number/bigint` | Minimum value for numbers or bigints.                                                           |
| `maxValue`          | `number/bigint` | Maximum value for numbers or bigints.                                                           |
| `regexPattern`      | `RegExp`        | Regex pattern to match strings.                                                                 |
| `allowedValues`     | `any[]`         | Array of valid values.                                                                           |
| `prohibitedValues`  | `any[]`         | Array of invalid values.                                                                         |
| `requiredFields`    | `string[]`      | List of required fields for objects.                                                            |
| `customValidator`   | `function`      | A custom validation function that returns `true` or `false`.                                     |
| `customErrors`      | `object`        | Custom error messages for specific validation keys. (See below)                                 |

---

### **Custom Errors**

Customize error messages by providing a `customErrors` object in the rules. The following keys are available:

| Key                   | Default Error Message                                      |
|-----------------------|------------------------------------------------------------|
| `ALLOW_EMPTY`         | `Empty values are not allowed.`                            |
| `MIN_LENGTH`          | `Length must be at least {minLength}.`                     |
| `MAX_LENGTH`          | `Length must not exceed {maxLength}.`                      |
| `MIN_VALUE`           | `Value must be at least {minValue}.`                       |
| `MAX_VALUE`           | `Value must not exceed {maxValue}.`                        |
| `ALLOWED_VALUES`      | `Value is not in the allowed values.`                      |
| `PROHIBITED_VALUES`   | `Value is in the prohibited values.`                       |
| `REQUIRED_FIELDS`     | `Field {field} is required.`                               |
| `TYPE_MISMATCH`       | `Expected type {type}, but received {actualType}.`         |
| `REGEX_PATTERN`       | `String does not match the required pattern.`              |
| `CUSTOM_VALIDATOR`    | `Custom validation failed.`                                |

---

## **Contributing**

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add my new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a Pull Request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Support**

If you encounter any issues, please [open an issue](https://github.com/your-username/validation-toolkit/issues) on GitHub.

---
