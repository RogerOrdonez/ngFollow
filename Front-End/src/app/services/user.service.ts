import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identity;
  public token;

  constructor( public http: HttpClient) {
    this.url = environment.backendUrl;
  }

  register(user: User): Observable<any> {
    console.log(user);
    console.log(this.url);
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'register', params, {headers: headers});
  }

  signUp(user: User, getToken: String = null) {
    if (getToken != null ) {
      user.gettoken = getToken;
    }
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', params, {headers: headers});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;

  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;

  }

}