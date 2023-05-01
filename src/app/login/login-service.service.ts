import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  user: any;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          observer.next({
            uid: user.uid,
            email: user.email,
          });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getUser() {
    return this.afAuth.currentUser;
  }
}
