# Angular 22: Getting Specific Validation Errors with Signal Forms

This repository demonstrates how to use the new `getError()` function introduced in Angular v22.0.0-next.6 for Signal Forms.

When building complex forms with multiple validation rules on a single field (like a password field requiring an uppercase letter, a number, a special character, and a minimum length), you often need to display specific messages or UI states based on which exact rule failed.

Previously in Signal Forms, trying to access a specific error by its index in the `errors()` array was unreliable because the array order changes dynamically as errors are added and removed. Using `errors().find()` was a functional but verbose workaround.

With Angular 22, the `FieldState` now includes a `getError(kind: string)` method that explicitly returns the first validation error matching the provided kind, making template logic much cleaner and less prone to bugs.

## Features Demonstrated

- **Signal Forms**: Uses the new `form()` and `FormField` APIs from `@angular/forms/signals`.
- **Custom Validators**: Demonstrates how to create and apply multiple synchronous validators to a single field using the `validate()` function.
- **The `getError()` Function**: Shows how to use `getError('missingUppercase')`, `getError('missingNumber')`, etc., directly in the template to conditionally apply CSS classes.
- **Dynamic UI State**: Conditionally styling a list of password requirements as they are satisfied by the user's input.

## Running the Demo

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start
   ```

3. Open your browser to `http://localhost:4200`.

## Related

- Watch the tutorial on YouTube: Soon...
- [Signal Forms full course](https://www.udemy.com/course/angular-signal-forms/?couponCode=021409EC66FC6440B867)