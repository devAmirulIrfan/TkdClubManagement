import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forgotPassword } from 'src/model/signUp-signIn-Model/signUpsignInModel';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- Add this line
import { SignUpSignInForgotPasswordService } from 'src/services/signUp-signIn-ForgotPassword-Service/sign-up-sign-in-forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  formGroup!: FormGroup<forgotPassword>;

  constructor(private forgotPassword: SignUpSignInForgotPasswordService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.formGroup = new FormGroup<forgotPassword>({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    const email = this.formGroup.controls.email.value;

    if (this.formGroup.valid && email) {
      this.forgotPassword
        .forgotPassword(email)
        .then(() => {
          console.log('Password reset email sent!');
          // this.successMessage = 'Password reset email sent!';
          // handle successful password reset email
        })
        .catch((error) => {
          console.log('Error:', error);
          console.log(error.message);
          // handle failed password reset email
        });
    }
  }
}
