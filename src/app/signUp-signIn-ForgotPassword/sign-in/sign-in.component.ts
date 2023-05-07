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
import { RouterModule } from '@angular/router'; // <-- Add this line
import { SignUpSignInForgotPasswordService } from 'src/services/signUp-signIn-ForgotPassword-Service/sign-up-sign-in-forgot-password.service';
import { UserRole } from 'src/model/signUp-signIn-Model/signUpsignInModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  formGroup!: FormGroup<LoginForm>;

  adminIds = [{ id: 1 }, { id: 2 }, { id: 3 }];

  constructor(
    private login: SignUpSignInForgotPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
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
      this.login
        .signIn(email, password)
        .then((userCredential) => {
          console.log('Sign in successful!');
          const user = userCredential.user;
          if (user) {
            console.log('User ID:', user.uid);
            console.log('Email:', user.email);

            let role: UserRole;
            if (user.uid === 'voOgPNjXdGhNBq4dU3GPXpwPF7h2') {
              role = UserRole.Admin;
              alert('hello admin');
              console.log('User role:', role);
              this.router.navigate([`/${role}`]);
            } else {
              role = UserRole.User;
            }
          }
          // handle successful login
        })
        .catch((error) => {
          console.log('Error:', error.message);
          // this.errorMessage = error.message;
          // handle failed login
        });
    }
  }
}
