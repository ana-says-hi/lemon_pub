import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleServiceService} from "../../services/peeps/people-service.service";
import {User} from "../../model/user";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import { getAuth } from "firebase/auth";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
   // AuthService
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  //providers: [AuthService],
})
export class LoginPageComponent {
  //auth = getAuth();

  mail_username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {
    console.log('constructor_log');
  }

  loginUser() {
    this.authService.login(this.mail_username, this.password)
      .then(() => {
        //console.log('Login successful');
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        console.error('Login failed:', error.message);
      });
  }
}
