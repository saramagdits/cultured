import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

// Needed for POST request. Authorization to come from AuthService
// const httpOptions = {
//   headers: new HttpHeaders({
//     // Content inferred by browser, content-type causes error
//     // 'Content-Type':  'multipart/form-data',
//     // Just for testing. Should be provided by authservice
//     'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
//   })
// };

@Injectable()

export class RegisterService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthenticationService) {
}
  registerUser (user: {}) {
    // Log the user out in case they are logged in for some reason
    this.authService.logout();
    const url = `${this.apiUrl}/users`;
    return this.http.post(url, user);
  }
}
