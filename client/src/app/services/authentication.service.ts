import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  registerUser (newUser) {
    // Log the user out in case they are logged in for some reason
    this.logout();
    const url = `${environment.apiUrl}/users`;
    return this.http.post<any>(url, newUser)
      .pipe(map(user => {
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user loggedError: data and hash arguments required in between page refreshes
          user.authdata = window.btoa(newUser.username + ':' + newUser.password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
