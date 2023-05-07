import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp-signIn-ForgotPassword/sign-up/sign-up.component';
import { SignInComponent } from './signUp-signIn-ForgotPassword/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './signUp-signIn-ForgotPassword/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
