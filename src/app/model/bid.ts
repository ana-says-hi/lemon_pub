import {firestore} from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

export class Bid{
  active: boolean;
  book_title: string;
  min_value: string;
  offers: (string | DocumentReference)[]; //Firestore refs
  user_email: string;

  constructor(data: {
    book_title: string;
    min_value: string;
    offers: (string | DocumentReference)[];
    user_email: string;
  }) {
    this.active = true;
    this.book_title = data.book_title;
    this.min_value = data.min_value;
    this.offers = data.offers;
    this.user_email = data.user_email;
  }
}
