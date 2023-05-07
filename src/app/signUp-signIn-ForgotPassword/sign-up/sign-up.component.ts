import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginForm } from 'src/model/signUp-signIn-Model/signUpsignInModel';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { SignUpServiceService } from 'src/app/sign-up/sign-up-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formGroup!: FormGroup<LoginForm>;

  constructor(private signUp: SignUpServiceService) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.formGroup = new FormGroup<LoginForm>({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    const email = this.formGroup.controls.email.value;
    const password = this.formGroup.controls.password.value;

    if (this.formGroup.valid && email && password) {
      this.signUp
        .signup(email, password)
        .then(() => {
          console.log('Sign up successful!');
          // handle successful signup
        })
        .catch((error) => {
          console.log('Error:', error);
          // this.errorMessage = error.message;
          // handle failed signup
        });
    }
  }
}
