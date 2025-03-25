import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {signInWithEmailAndPassword} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";
import {PeopleServiceService} from "../../services/peeps/people-service.service";
import {User} from "../../model/user";


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
  //auth = inject(AuthService);

  mail_username: string = "";
  password: string = "";

  constructor(private router: Router, private peopleService: PeopleServiceService) { // private authService: AuthService,
    console.log('constructor_log');
  }

  loginUser() {
    console.log('loginUser_log');
    console.log(this.mail_username);

    let user: User | null;
    user = this.peopleService.getUserByEmail(this.mail_username);
    console.log(user);

    if (user != null) {
      if (user.password === this.password) {
        console.log('User found');
        // localStorage.setItem('user_email', user.toString());
        localStorage.setItem('user_email', user.email);
        // localStorage.setItem('user_email', user.username);

        this.router.navigate(['/profile']);
      }
    } else {
      user = this.peopleService.getUserByUsername(this.mail_username);
      if (user != null) {
        if (user.password === this.password) {
          console.log('User found');
          // localStorage.setItem('user_email', user.toString());
          localStorage.setItem('user_email', user.email);
          // localStorage.setItem('user_email', user.username);

          this.router.navigate(['/profile']);
        }
      } else
        console.log('User not found');
    }
  }


  // loginUser() { //auth
  //console.log(getAuth());
  //signInWithEmailAndPassword(getAuth(), this.mail_username, this.password)
  // this.authService.login(this.mail_username, this.password)
  //    .then(() => {
  //      //console.log('Login successful');
  //      this.router.navigate(['/profile']);
  //    })
  //    .catch(error => {
  //      console.error('Login failed:', error.message);
  //    });
  // }
}
