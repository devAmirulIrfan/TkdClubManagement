import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface forgotPassword {
  email: FormControl<string | null>;
}

export enum UserRole {
  Admin = 'admin',
  Instructor = 'instructor',
  User = 'user',
}
