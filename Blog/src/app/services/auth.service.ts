import {Injectable} from '@angular/core';
import {ILogin} from '../models/login';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public ip = 'http://localhost:4000/';
  public urls = {
    login: this.ip + 'account/login',
    create: this.ip + 'account/create',
    delete: this.ip + 'account/delete/'
  };
  public users: object;

  constructor(private httpClient: HttpClient) {
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('id', '-1');
  }

  public login(data): Observable<ILogin> {
    return this.httpClient.post<ILogin>(this.urls.login, data);
  }

  public create(data): Observable<ILogin> {
    return this.httpClient.post<ILogin>(this.urls.create, data);
  }

  public delete(id): Observable<ILogin> {
    return this.httpClient.delete<ILogin>(this.urls.delete + id);
  }

}

// POST: localhost:4000/account/login
// POST: localhost:4000/account/create
// DELETE: localhost:4000/account/delete/:id
