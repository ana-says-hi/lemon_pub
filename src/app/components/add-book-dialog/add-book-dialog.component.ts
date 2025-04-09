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
    this.newBook = new UserFile("", "", "", "", false);
    this.newBook.userEmail = localStorage.getItem('user_email') || "user_not_logged_in";
  }

  saveBook() {
    this.dialogRef.close(this.newBook);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  fileBrowserHandler(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Optional: Add CSS class to highlight the dropzone
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Optional: Remove CSS class
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files.length) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach(file => {
      console.log('File dropped:', file.name);
      // Handle the file (e.g., upload it, display preview, etc.)
    });
  }
}
