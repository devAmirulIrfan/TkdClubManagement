import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class SignUpSignInForgotPasswordService {
  constructor(private afAuth: AngularFireAuth) {}

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  async updateProfile(displayName: string, photoURL: string) {
    const user = await this.getCurrentUser();
    if (user) {
      await user.updateProfile({
        displayName,
        photoURL,
      });
    }
  }

  async updateEmail(email: string) {
    const user = await this.getCurrentUser();
    if (user) {
      await user.updateEmail(email);
    }
  }

  async updatePassword(password: string) {
    const user = await this.getCurrentUser();
    if (user) {
      await user.updatePassword(password);
    }
  }
}
