import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserFile} from "../../model/user_file";
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {MatDialog} from "@angular/material/dialog";
import {PeopleServiceService} from "../../services/peeps/people-service.service";
import {AddBookDialogComponent} from "../add-book-dialog/add-book-dialog.component";
import {MakeOfferDialogComponent} from "../make-offer-dialog/make-offer-dialog.component";
import {OfferService} from "../../services/offers/offer.service";
import {ChatComponent} from "../chat/chat/chat.component";
import {MakeBidDialogComponent} from "../make-bid-dialog/make-bid-dialog.component";
import {BidsService} from "../../services/bids/bids.service";
import {Bid} from "../../model/bid";
import {Offer} from "../../model/offer";


@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  user_email: string = '';
  is_writer: boolean = true;
  is_admin: boolean = false;

  showMore: boolean[] = [];
  loading: boolean = true;

  books: UserFile[] = [];
  bids: Bid[] = [];
  offers: Offer[] = [];

  constructor(private filesService: FilesServiceService,
              private userService: PeopleServiceService,
              private offerService: OfferService,
              private bidsService: BidsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user_email = localStorage.getItem('user_email') || "user_not_logged_in";
    // console.log(localStorage.getItem('user_type'));
    this.is_writer = localStorage.getItem('user_type') == 'writer';
    this.is_admin = localStorage.getItem('user_type') == 'admin';
    if (!this.is_writer) {
      this.filesService.getFiles().subscribe((data) => {
        this.books = data;
        this.books.forEach((file, index) => {
          this.userService.getUserByEmail(file.userEmail).subscribe((user) => {
            file.displayOwner = user?.first_name + ' ' + user?.last_name;
            //file.userEmail = user?.first_name + ' ' + user?.last_name + ' ('+ user.username+')'
          });
        });
      });

      this.bidsService.getAllBids().subscribe((data: Bid[]) => {
        this.bids = data;
        console.log("bids:",this.bids)
      });
    }
    else{
      this.bidsService.getBidbyUser(this.user_email).subscribe((data: Bid[]) => {
        this.bids = data;
        console.log("bids:",this.bids)
      });
    }
    this.offerService.getOffersByUser(this.user_email).subscribe((data: Offer[]) => {
      this.offers = data;
    });
    this.loading = false;
  }

  toggleReadMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
  }

  makeOffer(book: UserFile) {
    const dialogRef = this.dialog
      .open(MakeOfferDialogComponent, {
        height: '400px',
        minWidth: '400px',
        data: {book: book.book_title, autor: book.userEmail}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offerService.addOffer(result).subscribe({
          next: (response) => {
            console.log('Offer added successfully:', response);
          },
          error: (err) => {
            console.error('Error occurred while adding offer:', err);
          }
        });
      }
    });
  }

  chat(userEmail: string) {
    if (!userEmail) {
      console.error('Invalid userEmail:', userEmail);
      return;
    }

    console.log('Opening chat with user:', userEmail);

    const dialogRef = this.dialog.open(ChatComponent, {
      height: '400px',
      minWidth: '400px',
      data: {targetUserId: userEmail}
    });
  }

  makeBid() {
    const dialogRef = this.dialog.open(MakeBidDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bidsService.createBid(result).subscribe({
          next: (response) => {
            console.log('Bid added successfully:', response);
          },
          error: (err) => {
            console.error('Error occurred while adding bid:', err);
          }
        });
      }
    });
  }
}
