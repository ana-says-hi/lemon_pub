import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {UserFile} from "../../model/user_file";
import {HttpClient} from "@angular/common/http";
import {Offer} from "../../model/offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:3532/api/offers'
  constructor(private httpClient: HttpClient) { }

  addOffer(offer: Offer): Observable<Offer> {
    return this.httpClient.post<Offer>(this.apiUrl, offer).pipe(
      //tap(() => console.log('File successfully sent to the backend:', file)),
      catchError(error => {
        console.error('Error adding offer:', error);
        return throwError(() => new Error('Failed to add file. Please try again later.'));
      })
    );
  }
}
