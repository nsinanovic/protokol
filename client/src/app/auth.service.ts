import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, username: string}>('/api/auth', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('logged_user', result.username);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('logged_user');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get loggedUser(): string {
    return (localStorage.getItem('logged_user'));
  }
}
