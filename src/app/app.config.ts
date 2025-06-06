import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient} from "@angular/common/http";

import {routes} from './app.routes';
import {provideFirebaseApp, initializeApp as initializeApp_alias} from "@angular/fire/app";
import {provideAuth, getAuth as getAuth_alias} from "@angular/fire/auth";
import {provideFirestore, getFirestore as getFirestore_alias} from "@angular/fire/firestore";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getApp, initializeApp} from "firebase/app";
import {environment} from "../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {StreamChatModule} from "stream-chat-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, StreamChatModule,
      AngularFireStorageModule, AngularFireAuth, AngularFireModule.initializeApp(environment.firebaseConfig),),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    // importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig),
    //   AngularFireAuthModule),
    // provideAuth(() => getAuth(getApp())),
  ]
};
