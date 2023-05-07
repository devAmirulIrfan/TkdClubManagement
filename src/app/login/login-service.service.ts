import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CenterResponse } from './loginModel';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  user: any;

  private apiUrl =
    'https://firestore.googleapis.com/v1/projects/tkdclubmanagement-42157/databases/(default)/documents/center';

  getItems(): Observable<CenterResponse> {
    return this.http.get<CenterResponse>(`${this.apiUrl}?pageSize=50`);
  }

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
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
