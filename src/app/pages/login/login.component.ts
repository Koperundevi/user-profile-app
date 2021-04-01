import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUrl = `${environment.API_URL}/login`;
  verifingMe = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.verifingMe = true;
      this.userService.getMe(true).subscribe(
        () => {
          this.router.navigate(['/profile']);
        },
        () => {
          this.verifingMe = false;
        }
      );
    }
  }
}
