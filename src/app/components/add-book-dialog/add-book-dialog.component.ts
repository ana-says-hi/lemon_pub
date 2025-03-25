import {Component} from '@angular/core';
import {UserFile} from "../../model/user_file";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.css'
})
export class AddBookDialogComponent {
  newBook: UserFile;

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>) {
    this.newBook = new UserFile("", "", "", "");
    this.newBook.userEmail = localStorage.getItem('user_email') || "user_not_logged_in";
  }

  saveBook() {
    this.dialogRef.close(this.newBook);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  generateSummary() {

  }
}
