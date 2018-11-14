import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  url: string;

  constructor(private http: HttpClient) {
      this.url = environment.baseUrl;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.url}/login`, {
        username: username,
        password: password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isUniqueUsername(user: string) {
    return this.http.get<any>(`${this.url}/uniqueUsername?username=${ user }`);
  }

  register(newUser: any) {
    return this.http.post<any>(`${this.url}/register`, newUser);
  }
}
