import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageConfig } from '../configs/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  /**
   * set Token
   * @param data Token to be set
   */
  public setToken(data: string): void {
    localStorage.setItem(LocalStorageConfig.TOKEN, data.toString());
  }

  /**
   * get Token
   * @return Token fetched from local storage
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
   * logout
   * clears local storage of certain items and redirects user to login page
   */
  public logout(): void {
    localStorage.removeItem(LocalStorageConfig.ME);
    localStorage.removeItem(LocalStorageConfig.TOKEN);
    this.router.navigate(['login']);
  }

  /**
   * Get current authenticated user details
   * @return user details
   */
  public getMe(): string {
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
