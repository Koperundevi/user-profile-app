import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

import { BaseHttpService } from './base-http.service';
import { LocalStorageConfig } from '../configs/local-storage.config';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userInfoUpdateSubject = new Subject();
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

    return this.http.get('auth/me', {}, expectUnauth).pipe(
      tap((me) => {
        // store the info in localStorage before returning
        localStorage.setItem(LocalStorageConfig.ME, JSON.stringify(me));
      })
    );
  }
}
