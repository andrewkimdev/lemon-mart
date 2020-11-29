import { Injectable } from '@angular/core';
import { sign } from 'fake-jwt-sign';
import { Observable, of, throwError } from 'rxjs';

import { PhoneType, User } from '../user/user/user';
import { Role } from './auth.enum';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryAuthService extends AuthService {
  constructor() {
    super();
    console.log(
      "You're using the InMemoryAuthService. DO NOT USE this service in production."
    );
  }

  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'andrewbkim.dev@gmail.com',
    name: { first: 'Andrew', last: 'Kim' },
    picture: '',
    role: Role.Manager,
    dateOfBirth: new Date(1999, 1, 1),
    userStatus: true,
    address: {
      line1: '101 Sesame St.',
      line2: '',
      city: 'Bethesda',
      state: 'Maryland',
      zip: '20810',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '555-155-5464',
      },
    ],
  });

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase();
    if (!email.endsWith('@test.com')) {
      return throwError('Failed to login. Email needs to end with @test.com.');
    }
    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
          ? Role.Clerk
          : email.includes('manager')
            ? Role.Manager
            : Role.None,
    } as IAuthStatus;

    this.defaultUser.role = authStatus.userRole;
    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    };
    return of(authResponse);
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }
}
