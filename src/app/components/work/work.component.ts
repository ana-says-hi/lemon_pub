import {Component} from '@angular/core';
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {UserFile} from "../../model/user_file";
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddBookDialogComponent} from "../add-book-dialog/add-book-dialog.component";
import {reload} from "@angular/fire/auth";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  books: UserFile[] = [];

  constructor(private filesService: FilesServiceService, private dialog: MatDialog) {
    this.books=this.filesService.books;
    let book1 = new UserFile("admin@email.com", "The Great Gatsby", "A book about bloo bli bli", "pdf");
    this.books.push(book1);
  }

  addBook() {
    const dialogRef = this.dialog
      .open(AddBookDialogComponent, {
        // width: '600px',
        width: '700px',
        height: '500px',
        // maxHeight: '90vh',
        panelClass: 'custom-dialog-container'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.books.push(result);
        console.log('Book added:', result);
        //window.location.reload();
      }
    });
  }
}
