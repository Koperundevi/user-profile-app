import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

import { BaseHttpService } from './base-http.service';
import { LocalStorageConfig } from '../configs/local-storage.config';

import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: BaseHttpService, private toastr: ToastrService) {}

  /**
   * GET current user summary info
   * @param forceRefresh - whether the me info should be explicity fethced from server
   * @param expectUnauth - whether calling component wishes to handle 401 error themself
   */
  public getMe(forceRefresh?: boolean, expectUnauth?: boolean): Observable<UserModel> {
    // if info is stored in localStorage and caller doesn't demand a refresh, return the stored object
    const storedMe = localStorage.getItem(LocalStorageConfig.ME);
    if (storedMe && !forceRefresh) {
      return of(JSON.parse(storedMe));
    }

    return this.http.get('user/me', {}, expectUnauth).pipe(
      tap((me) => {
        // store the info in localStorage before returning
        localStorage.setItem(LocalStorageConfig.ME, JSON.stringify(me));
      })
    );
  }

  /**
   * Fetch user profile from API
   */
  public fetchProfile(): Observable<ProfileModel> {
    return this.http.get('profile').pipe(tap(() => this.toastr.success(`Profile details fetched successfully`)));
  }

  /**
   * Create user profile in API
   * @param profile User profile data to be created
   */
  public createProfile(profile?: ProfileModel): Observable<ProfileModel> {
    return this.http.post('profile', profile).pipe(tap(() => this.toastr.success(`Profile created successfully`)));
  }

  /**
   * Update user profile in API
   * @param profile User profile data to be updated
   */
  public updateProfile(profile?: ProfileModel): Observable<ProfileModel> {
    return this.http.put('profile', profile).pipe(tap(() => this.toastr.success(`Profile updated successfully`)));
  }

  /**
   * Delete user profile in API
   */
  public deleteProfile(): Observable<any> {
    return this.http.delete('profile').pipe(tap(() => this.toastr.success(`Profile deleted successfully`)));
  }
}
