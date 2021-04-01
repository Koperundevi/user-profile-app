import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';
import { LocalStorageConfig } from '../configs/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private router: Router) {}

  /**
   * POST call Login User
   * @param email email value
   * @param password password value
   */
  public loginUser(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError((error) => {
        this.toastr.error(error.error.message, '');
        return throwError(error);
      })
    );
  }

  /**
   * set Token
   * @param data Token value
   */
  public setToken(data: string): void {
    localStorage.setItem(LocalStorageConfig.TOKEN, data.toString());
  }

  /**
   * get Token
   * @return token value
   */
  public getToken(): string {
    if (
      localStorage.getItem(LocalStorageConfig.TOKEN) === undefined ||
      localStorage.getItem(LocalStorageConfig.TOKEN) === null ||
      localStorage.getItem(LocalStorageConfig.TOKEN) === ''
    ) {
      return '';
    } else {
      return localStorage.getItem(LocalStorageConfig.TOKEN) || '';
    }
  }

  /**
   * isUserAuthenticated
   * @return is authenticated
   */
  public isUserAuthenticated(): boolean {
    return this.getToken() !== '';
  }

  /**
   * logout
   * clears local storage of certain items and redirects user to login page
   */
  public logout(): void {
    localStorage.removeItem(LocalStorageConfig.ME);
    localStorage.removeItem(LocalStorageConfig.TOKEN);
    this.router.navigate(['login']);
  }

  /**
   * get me
   * @return token value
   */
  private getMe(): string {
    if (
      localStorage.getItem(LocalStorageConfig.ME) === undefined ||
      localStorage.getItem(LocalStorageConfig.ME) === null ||
      localStorage.getItem(LocalStorageConfig.ME) === ''
    ) {
      return '';
    } else {
      return localStorage.getItem(LocalStorageConfig.ME) || '';
    }
  }
}
