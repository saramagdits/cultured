import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Needed for POST request. Authorization to come from AuthService
const httpOptions = {
  headers: new HttpHeaders({
    // Content inferred by browser, content-type causes error
    // 'Content-Type':  'multipart/form-data',
    // Just for testing. Should be provided by authservice
    // 'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
  })
};

@Injectable()
export class UsersService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  getAllUsers() {
    // HttpClient will create an observable for the request, but has not sent it yet
    // It must be subscribed to
    const url = `${this.apiUrl}/users`;
    return this.http.get(url);
  }
  getUserById (id: number) {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.get(url);
  }
  createNewUser (user: {}) {
    const url = `${this.apiUrl}/users`;
    return this.http.post(url, user, httpOptions);
  }
}
