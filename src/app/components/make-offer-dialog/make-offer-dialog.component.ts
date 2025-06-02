import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../../services/file_storage/storage.service";
import {UserFile} from "../../model/user_file";
import {FormsModule} from "@angular/forms";
import {Offer} from "../../model/offer";

@Component({
  selector: 'app-make-offer-dialog',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './make-offer-dialog.component.html',
  styleUrl: './make-offer-dialog.component.css'
})
export class MakeOfferDialogComponent {
  newOffer: Offer;
  title: string;

  constructor(public dialogRef: MatDialogRef<MakeOfferDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { book: string, autor: string }) {
    this.newOffer = new Offer()
    this.newOffer.agent = localStorage.getItem('user_email') || "user_not_logged_in";
    this.title = data.book
    this.newOffer.book_id = this.title + '_' + data.autor;
    this.newOffer.autor = data.autor;
  }

  saveOffer() {
    alert("Offer saved:" + this.newOffer.book_id);
    this.newOffer.timestamp = new Date().toISOString();
    this.dialogRef.close(this.newOffer);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
