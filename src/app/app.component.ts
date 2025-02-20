import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LemonPub';
  constructor(){
    const app = initializeApp(environment.firebase);
    getAuth();
    //const analytics = getAnalytics(app);
    console.log('Firebase Initialized');
  }
}
