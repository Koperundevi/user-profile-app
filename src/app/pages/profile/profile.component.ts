import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/user.model';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: UserModel;
  isProfileEmpty: boolean;
  isLoading: boolean;
  apiAction: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group({
      name: '',
      email: '',
      phone: '',
      currentaddress: '',
      previousaddress: '',
    });
    this.user = {
      username: '',
      id: '',
      isactive: false,
    };
    this.isProfileEmpty = true;
    this.isLoading = true;
    this.apiAction = '';
  }

  /**
   * On page load, fetch user details and profile details from API
   */
  ngOnInit(): void {
    this.userService.getMe().subscribe((data: UserModel) => {
      this.user = data;
    });
    this.userService.fetchProfile().subscribe((data: ProfileModel) => {
      if (!_.isEmpty(data)) {
        this.isProfileEmpty = false;
        this.form.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
          currentaddress: data.currentaddress,
          previousaddress: data.previousaddress,
        });
      }
      this.isLoading = false;
    });
  }

  /**
   * Create user profile in API
   */
  createProfile(): void {
    if (Object.values(this.form.value).every((val) => val === '')) {
      this.toastr.warning('Atleast 1 value must be filled to create profile');
    } else {
      this.isLoading = true;
      this.apiAction = 'create';
      this.userService.createProfile(this.form.value).subscribe(() => {
        this.isProfileEmpty = false;
        this.isLoading = false;
      });
    }
  }

  /**
   * Update user profile in API
   */
  updateProfile(): void {
    if (Object.values(this.form.value).every((val) => val === '')) {
      this.toastr.warning('Empty profile cannot be updated');
    } else {
      this.isLoading = true;
      this.apiAction = 'update';
      this.userService.updateProfile(this.form.value).subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Delete user profile in API
   */
  deleteProfile(): void {
    this.isLoading = true;
    this.apiAction = 'delete';
    this.userService.deleteProfile().subscribe(() => {
      this.isProfileEmpty = true;
      this.form.patchValue({
        name: '',
        email: '',
        phone: '',
        currentaddress: '',
        previousaddress: '',
      });
      this.isLoading = false;
    });
  }

  /**
   * Log out user by clearing local storage and navigating to login page
   */
  logout(): void {
    this.authService.logout();
  }
}
