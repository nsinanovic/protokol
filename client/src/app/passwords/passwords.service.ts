import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Password } from './password';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {
  constructor(private http: HttpClient) { }

  getPasswords() {
    return this.http.get<Password[]>('/api/passwords');
  }
  
}
