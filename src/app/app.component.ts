import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app";
import {Auth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getApps, provideFirebaseApp} from "@angular/fire/app";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LemonPub';
  constructor(){  //private firebaseService: FirebaseService
    // console.log("Firebase initialized in app.component.ts");
    // // const app = initializeApp(environment.firebase);
    // // const auth = getAuth(app);
    // // const db = getFirestore(app);
    // if (!getApps().length) {
    //   initializeApp(environment.firebase);
    //   console.log("✅ Firebase initialized in app.component.ts");
    // } else {
    //   console.log("⚠️ Firebase app already exists");
    // }
  }
}
