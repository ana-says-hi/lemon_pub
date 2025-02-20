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
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy{
  auth = getAuth();

  mail_username: string = "";
  password: string = "";
  userID: number = -1;

  userList: User[] = [];

  constructor(private peopleService: PeopleServiceService, private authService: AuthService, private router: Router) {
    console.log('constructor_log');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.peopleService.getUsers()
      .subscribe((users: User[]) => {
      this.userList = users;
      });
  }

  loginUser() {
    this.authService.login(this.mail_username, this.password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Login failed:', error.message);
      });
  }
      // if (this.userList.find(x => (x.email === this.mail_username && x.password === this.password))){
      //   this.userID=this.peopleService.getUserByEmail(this.mail_username);
      //   console.log('User found!');
      // }
      // else if (this.userList.find(x=> x.username === this.mail_username && x.password === this.password)){
      //   this.userID=this.peopleService.getUserByUsername(this.mail_username);
      //   console.log('User found!');
      //   //window.location.href = '/home';
      //   this.router.navigate(['/home']);
      // }
      // else console.log('Failed the login attempt!');
  // }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
