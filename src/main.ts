import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {appConfig} from "./app/app.config";
import {getApp, initializeApp} from "firebase/app";
import {environment} from "./environments/environment";
import {provideAuth} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";
import {provideFirebaseApp} from "@angular/fire/app";
import {provideFirestore} from "@angular/fire/firestore";
import {getFirestore} from "firebase/firestore";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {getStorage, provideStorage} from "@angular/fire/storage";

// if (!getApps().length) {
//   console.log("Initializing Firebase...");
const app = initializeApp(environment.firebaseConfig);
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => app),
    provideAuth(() => getAuth(app)),
    provideFirestore(() => getFirestore(app)),
    provideStorage(() => getStorage(app)),
    ...appConfig.providers, provideAnimationsAsync()
  ]
}).catch(err => console.error(err));

console.log("App initialized:", getApp());
// console.log("Storage initialized", getStorage(app));
// console.log("Auth initialized:", getAuth(app));

// const app2 = initializeApp(environment.firebaseConfig);
//
// setTimeout(() => {
//   const a = getAuth(app2);
//   console.log("Auth initialized:", a);
// }, 1000);
