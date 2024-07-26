import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleServiceService} from "../../services/peeps/people-service.service";
import {User} from "../../model/user";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy{
  mail_username: string = "";
  password: string = "";
  userID: number = -1;

  userList: User[] = [];

  constructor(private peopleService: PeopleServiceService){
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
    console.log('Login attempt');
    console.log(this.mail_username)
    console.log(this.password)

    try {
      if (this.userList.find(x => (x.email === this.mail_username && x.password === this.password))){
        this.userID=this.peopleService.getUserByEmail(this.mail_username);
        console.log('User found!');
      }
      else if (this.userList.find(x=> x.username === this.mail_username && x.password !== this.password)){
        this.userID=this.peopleService.getUserByUsername(this.mail_username);
        console.log('User found!');
      }
    } catch (e) {
      console.log('Failed the login attempt!');
     }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
