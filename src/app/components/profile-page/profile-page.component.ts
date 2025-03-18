import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(private router: Router) {
    // if(localStorage.getItem('user_token') === null){
    //   //window.location.href = '/login';
    //   this.router.navigate(['/login']);
    // }
  }
}
