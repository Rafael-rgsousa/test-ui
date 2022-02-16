import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/UserModel';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser') ?? '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    try {
      const result: any = await lastValueFrom(
        this.http.post(`${environment.apiUrl}/auth/signin`, {
          username,
          password,
        })
      );

      const user = {
        username: result.user.username,
        authdata: result.accessToken,
        id: result.user.user_info.id,
        firstName: result.user.user_info.name,
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(result);
      this.router.navigateByUrl('/dashboard');
      return user;
    } catch (err) {
      debugger;
      throw err;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
