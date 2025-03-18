import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {signInWithEmailAndPassword} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";


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

  constructor(private authService: AuthService ,private router: Router) { // private authService: AuthService,
    console.log('constructor_log');
  }

  loginUser() {
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
  }
}
