import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { form, FormField, required, email, validateAsync, debounce } from '@angular/forms/signals';

interface SignUpForm {
  username: string;
  email: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
})
export class FormComponent {
  protected model = signal<SignUpForm>({
		username: '',
		email: '',
	});

	protected form = form(this.model, s => {
		required(s.username, {message: 'A username is required'});
		required(s.email, {message: 'An email address is required'});
		email(s.email, {message: 'Please enter a valid email address'});

		debounce(s.username, 500);

		validateAsync(s.username, {
			// debounce: 500,
			params: ctx => {
				const val = ctx.value();
				if (!val || val.length < 3) return undefined;
				return val;
			},
			factory: username =>
				resource({
					params: username,
					loader: async ({ params: username }) => {
						if (username === undefined) return undefined;
						const available = await this.checkUsernameAvailability(username);
						return available;
					},
				}),
			onSuccess: (result: boolean) => {
				if (!result) {
					return {
						kind: 'username_taken',
						message: 'This username is already taken',
					};
				}
				return null;
			},
			onError: (error: unknown) => {
				console.error('Validation error:', error);
				return null;
			},
		});
	});

	private checkUsernameAvailability(username: string): Promise<boolean> {
    return new Promise(resolve => {
        setTimeout(() => {
            const taken = ['admin', 'test', 'brian'];
            resolve(!taken.includes(username.toLowerCase()));
        }, 2500);
    });
	}
}
