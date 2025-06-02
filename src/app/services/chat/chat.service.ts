import { Injectable } from '@angular/core';
import {firestore} from "firebase-admin";
// import Firestore = firestore.Firestore;
import {Observable} from "rxjs";
import {Firestore, addDoc, collection, collectionData} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) {}

  getMessages(): Observable<any[]> {
    const chatRef = collection(this.firestore, 'messages');
    return collectionData(chatRef, { idField: 'id' });
  }

  sendMessage(text: string, user: string) {
    const chatRef = collection(this.firestore, 'messages');
    return addDoc(chatRef, { text, user, timestamp: new Date() });
  }
}
