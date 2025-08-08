import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null); // Signal to hold the current user state

  private baseUrl = environment.apiUrl;

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user); // Set the current user if login is successful
        }
      })
    );
  }

  login(cred: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', cred).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user); // Set the current user if login is successful
        }
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    // Clear the current user signal
    this.currentUser.set(null);
  }
}
