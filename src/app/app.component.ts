import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {getAuth} from 'firebase/auth';
import {environment} from '../environments/environment';
import {Auth, onAuthStateChanged, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getApps, provideFirebaseApp} from "@angular/fire/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp} from "firebase/app";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'lemons-24438';

  constructor() { //private auth: Auth

  }
}
