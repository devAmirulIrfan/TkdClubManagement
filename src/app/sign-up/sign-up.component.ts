import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { SignUpForm } from './signUpModel';
import Swal from 'sweetalert2';
import { SignUpServiceService } from './sign-up-service.service';
import { LoginServiceService } from '../login/login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formGroup!: FormGroup<SignUpForm>;

  constructor(
    private fb: FormBuilder,
    private auth: SignUpServiceService,
    private authService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
    this.showUser();
  }

  showUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      // this.user = user;
      console.log('User ID:', user?.uid);
      console.log('Email:', user?.email);
    });
  }

  initSignupForm() {
    this.formGroup = new FormGroup<SignUpForm>({
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
    if (this.formGroup.valid) {
      const email = this.formGroup.controls.email.value;
      const password = this.formGroup.controls.password.value;
      if (email && password) {
        Swal.fire({
          title: `Confirm register account email : ${email} | password : ${password}?`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          denyButtonText: `Let me recheck again`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(
              'Thank You! Your credentials have been sent to the server , Please wait for the email verification code to be sent',
              '',
              'success'
            );
            this.auth.signup(email, password).then(() => {
              Swal.fire(
                'Thank you!',
                'Email verification code has been sent to your email, Please check your email',
                'success'
              );
              this.formGroup.reset();
            });
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      }
    }
  }
}
