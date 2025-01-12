# **Smart Validation**

A robust and flexible validation library for JavaScript and TypeScript, providing built-in support for various data types, custom validation rules, and error handling.

---

## **Usage**

### Import the Library

```typescript
import { isValid, ValidationType } from "smart-validation";
```

### Basic Validation

```typescript
const rules = {
	minLength: 3,
	maxLength: 10,
	allowEmpty: false,
};

const result = isValid("Hello", ValidationType.STRING, rules);

if (result.isValid) {
	console.log("Validation passed!");
} else {
	console.log("Validation failed:", result.errors);
}
```
## **API Reference**

### **`isValid(value: any, type: ValidationType, rules: ValidationRules): ValidationResult`**

#### Parameters:

1. **`value`**: The value to be validated.
2. **`type`**: The expected data type. Must be one of the `ValidationType` enum values.
3. **`rules`**:(Optional) An object defining validation rules and custom error messages.

#### Returns:

-   An object with:
    -   `isValid`: Boolean indicating if validation passed.
    -   `errors`: Array of error messages if validation failed.


### **Validation Rules**

| Rule               | Type            | Description                                                     |
| ------------------ | --------------- | --------------------------------------------------------------- |
| `allowEmpty`       | `boolean`       | Whether empty values are allowed (default: `true`).             |
| `minLength`        | `number`        | Minimum length for strings or arrays.                           |
| `maxLength`        | `number`        | Maximum length for strings or arrays.                           |
| `minValue`         | `number/bigint` | Minimum value for numbers or bigints.                           |
| `maxValue`         | `number/bigint` | Maximum value for numbers or bigints.                           |
| `regexPattern`     | `RegExp`        | Regex pattern to match strings.                                 |
| `allowedValues`    | `any[]`         | Array of valid values.                                          |
| `prohibitedValues` | `any[]`         | Array of invalid values.                                        |
| `requiredFields`   | `string[]`      | List of required fields for objects.                            |
| `customValidator`  | `function`      | A custom validation function that returns `true` or `false`.    |
| `customErrors`     | `object`        | Custom error messages for specific validation keys. |

---