import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Offer} from "../../model/offer";
import {Bid} from "../../model/bid";
import {FormsModule} from "@angular/forms";
import {UserFile} from "../../model/user_file";
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {NgForOf} from "@angular/common";
import {BidsService} from "../../services/bids/bids.service";
import {OfferService} from "../../services/offers/offer.service";

@Component({
  selector: 'app-make-bid-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './make-bid-dialog.component.html',
  styleUrl: './make-bid-dialog.component.css'
})
export class MakeBidDialogComponent implements OnInit {
  newBid: Bid;
  books: UserFile[] = [];
  selectedBook: UserFile | null = null;
  value: string = '';
  user_email: string;

  constructor(public dialogRef: MatDialogRef<MakeBidDialogComponent>,
              private userFileService: FilesServiceService) {
    this.user_email = localStorage.getItem('user_email') || "user_not_logged_in";
    this.newBid = new Bid({
      book_title: '',
      min_value: '',
      offers: [],
      user_email: '',
    });
  }

  ngOnInit(): void {
    this.userFileService.getFileByUserEmail(this.user_email).subscribe((data: UserFile[]) => {
      this.books = data;
    });
  }

  saveBid() {
    this.newBid.user_email = this.user_email;
    this.newBid.book_title = this.selectedBook?.book_title || '';
    this.newBid.min_value = this.value;
    alert("Bid saved:" + this.newBid.book_title);
    this.dialogRef.close(this.newBid);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
