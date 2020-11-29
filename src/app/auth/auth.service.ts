import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { transformError } from '../common/common';
import { IUser, User } from '../user/user/user';
import { Role } from './auth.enum';
import { CacheService } from './cache.service';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IServerAuthResponse {
  accessToken: string;
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService extends CacheService implements IAuthService {
  constructor() {
    super();
  }

  defaultAuthStatus: IAuthStatus = {
    isAuthenticated: false,
    userId: '',
    userRole: Role.None,
  };

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(this.defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());
  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>;
  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<User>;

  protected setToken(jwt: string): void {
    this.setItem('jwt', jwt);
  }

  protected clearToken(): void {
    this.removeItem('jwt');
  }
  getToken(): string {
    return this.getItem('jwt') ?? '';
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken();
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = decode.default(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status: IAuthStatus) => this.authStatus$.next(status)),
      filter((status: IAuthStatus) => status.isAuthenticated),
      mergeMap(() => this.getCurrentUser()),
      map((user) => this.currentUser$.next(user)),
      catchError(transformError)
    );

    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(err);
      },
    });
    return loginResponse$;
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => {
      this.authStatus$.next(this.defaultAuthStatus);
    }, 0);
  }
}
