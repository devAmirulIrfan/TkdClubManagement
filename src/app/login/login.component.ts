import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoginForm } from './loginModel';
import Swal from 'sweetalert2';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formGroup!: FormGroup<LoginForm>;

  message = '';
  user = '';
  constructor(
    private authService: LoginServiceService,
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

  showUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      // this.user = user;
      console.log('User ID:', user?.uid);
      console.log('Email:', user?.email);
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const email = this.formGroup.controls.email.value;
      const password = this.formGroup.controls.password.value;

      if (email && password) {
        this.authService.login(email, password).then(
          () => {
            console.log('successfully logged in');
            this.router.navigate(['/sign-up']);
            this.showUser();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'The email or password is invalid or the user does not have an account. Click link below to sign-up',
              footer: '<a href="/sign-up">sign-up</a>',
            });
          }
        );
      }
    }
  }
}
