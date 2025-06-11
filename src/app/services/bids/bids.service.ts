import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Bid} from "../../model/bid";
import {UserFile} from "../../model/user_file";

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  private apiUrl = 'http://localhost:3532/api/bids'

  constructor(private httpClient: HttpClient) {}

  createBid(bid: Bid): Observable<Bid> {
    return this.httpClient.post<Bid>(this.apiUrl, bid).pipe(
      catchError(error => {
        console.error('Error adding bid:', error);
        return throwError(() => new Error('Failed to add bid. Please try again later.'));
      })
    );
  }

  getBidbyUser(email: string): Observable<Bid[]> {
    return this.httpClient.get<Bid[]>(`${this.apiUrl}/${email}`)
  }

  getAllBids(): Observable<Bid[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}`);
  }

}
