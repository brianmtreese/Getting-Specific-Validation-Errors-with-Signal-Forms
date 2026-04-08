import { JsonPipe } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  // inject, 
  signal 
} from '@angular/core';
// import {
//   AbstractControl,
//   FormBuilder,
//   ReactiveFormsModule,
//   ValidationErrors,
//   Validators,
// } from '@angular/forms';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';

interface SignUpForm {
  username: string;
  password: string;
}

// function missingNumberValidator(
//   control: AbstractControl
// ): ValidationErrors | null {
//   if (!/\d/.test(String(control.value ?? ''))) {
//     return { missingNumber: true };
//   }
//   return null;
// }

// function missingUppercaseValidator(
//   control: AbstractControl
// ): ValidationErrors | null {
//   if (!/[A-Z]/.test(String(control.value ?? ''))) {
//     return { missingUppercase: true };
//   }
//   return null;
// }

// function missingSpecialCharValidator(
//   control: AbstractControl
// ): ValidationErrors | null {
//   if (!/[^A-Za-z0-9]/.test(String(control.value ?? ''))) {
//     return { missingSpecialChar: true };
//   }
//   return null;
// }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // ReactiveFormsModule, 
    FormField, 
    JsonPipe
  ],
})
export class FormComponent {
  // private readonly fb = inject(FormBuilder);
  // protected signUpForm = this.fb.group({
  //   username: ['', [Validators.required]],
  //   password: [
  //     '',
  //     [
  //       Validators.minLength(8),
  //       missingNumberValidator,
  //       missingUppercaseValidator,
  //       missingSpecialCharValidator,
  //     ],
  //   ],
  // });

  // Signal forms example (preserved; uncomment to use)
  protected model = signal<SignUpForm>({
  	username: '',
  	password: '',
  });
  
  protected form = form(this.model, s => {
  	required(s.username, {message: 'A username is required'});
  	minLength(s.password, 8);
  
  	// Password must include at least one number
  	validate(s.password, ({ value }) => {
  		if (!/\d/.test(value())) {
  			return { kind: 'missingNumber' };
  		}
  		return null;
  	});
  
  	// Password must include at least one uppercase letter
  	validate(s.password, ({ value }) => {
  		if (!/[A-Z]/.test(value())) {
  			return { kind: 'missingUppercase' };
  		}
  		return null;
  	});
  
  	// Password must include at least one special character
  	validate(s.password, ({ value }) => {
  		if (!/[^A-Za-z0-9]/.test(value())) {
  			return { kind: 'missingSpecialChar' };
  		}
  		return null;
  	});
  });
}



 
