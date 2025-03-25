import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {getAuth} from 'firebase/auth';
import {getApp, getApps, initializeApp} from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private auth: Auth;

  constructor() {
    // const app = initializeApp(environment.firebaseConfig);
    // this.auth = getAuth(app);
  }

  login(email: string, password: string) {

   // return this.auth.signInWithEmailAndPassword(email, password);
    //return signInWithEmailAndPassword(this.auth, email, password);
  }


  // constructor() { //private auth: Auth
  //   // if (!getApps().length) {
  //   //   throw new Error("🔥 Firebase app has not been initialized!");
  //   // }
  //   //this.auth = getAuth(getApp());
  //   //this.auth = getAuth();
  //   //this.auth=inject(Auth);
  // }
  //
  // // User methods
  // getUser() {
  //   //return this.auth.currentUser;
  // }
  //
  //
  // // Check if user is logged in
  // isLoggedIn(): boolean {
  //  // return this.auth.currentUser !== null;
  //   return true;
  // }
  //
  // // getToken() {
  // //   const user = this.auth.currentUser;
  // //   if (user) {
  // //     return user.getIdToken();
  // //   } else {
  // //     return Promise.resolve(null);
  // //   }
  // // }
  //
  // // async getToken() {
  // //   const user = this.auth.currentUser;
  // //   if (user) {
  // //     return await user.getIdToken();
  // //   } else {
  // //     return null;
  // //   }
  // // }
  //
  // // Actions (register, login, logout)
  // register(email: string, password: string) {
  // //  return this.auth.createUserWithEmailAndPassword(email, password)
  //     // .then(() => {
  //     //   console.log("User created successfully");
  //     // })
  //     // .catch((error: any) => {
  //     //   console.error('Registration failed:', error.message);
  //     //   throw error;
  //     // });
  // }
  // // async register(email: string, password: string) {
  // //   try {
  // //     await createUserWithEmailAndPassword(this.auth, email, password);
  // //     console.log("User created successfully");
  // //   } catch (error: any) {
  // //     console.error('Registration failed:', error.message);
  // //     throw error;
  // //   }
  // // }
  //
  // login(email: string, password: string) {
  //   //return this.auth.signInWithEmailAndPassword( email, password)
  //     // .then(userCredential => {
  //     //   return this.getToken().then(token => {
  //     //     if (token) {
  //     //       return userCredential;
  //     //     }
  //     //     return null;
  //     //   });
  //     // })
  //     // .catch((error: any) => {
  //     //   console.error('Login failed:', error.message);
  //     //   throw error;
  //     // });
  // }
  //
  // // async login(email: string, password: string) {
  // //   try {
  // //     const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
  // //     const token = await this.getToken();
  // //     if (token) {
  // //       return userCredential;
  // //     }
  // //   } catch
  // //     (error: any) {
  // //     console.error('Login failed:', error.message);
  // //     throw error;
  // //   }
  // //   return null;
  // // }
  //
  // logout() {
  //   //return signOut(this.auth);
  // }
}
