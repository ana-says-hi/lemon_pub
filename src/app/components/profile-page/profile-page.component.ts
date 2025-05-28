import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PeopleServiceService} from "../../services/peeps/people-service.service";
import {User} from "../../model/user";
import {firstValueFrom} from "rxjs";
// import localStorage from "$GLOBAL$";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  user: User | null = null;
  email: string = localStorage.getItem('user_email') || '';

  constructor(private router: Router, private peopleService: PeopleServiceService) {
  }

  async ngOnInit(): Promise<void> {
    console.log(this.email)
    this.user = await firstValueFrom(this.peopleService.getUserByEmail(this.email));
    // this.peopleService.getUserByEmail(this.email).subscribe((data) => {
    //   this.user = data;
    // });
    if (this.user === null) {
      console.log('User not found, redirecting to login');
      this.router.navigate(['/login']);
    }
    console.log('User is logged in:', this.user?.email);
    console.log('User Type is', this.user?.user_type);
  }
}
