import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  /**
   * Check if user is authenticated to access the application
   * Access check is done by checking if token is either present in local storage or query parameter
   * If token is not present, user will be navigated to login page
   * @param route Route which user is accessing
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else if (route.queryParams.token) {
      // Read token from query parameter
      localStorage.setItem('access_token', route.queryParams.token);
      this.router.navigate(['/profile']);
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
