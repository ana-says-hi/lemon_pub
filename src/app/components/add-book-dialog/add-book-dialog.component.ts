import {Component} from '@angular/core';
import {UserFile} from "../../model/user_file";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {StorageService} from "../../services/file_storage/storage.service";


@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.css'
})
export class AddBookDialogComponent {
  newBook: UserFile;
  isUploading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>,
              private storageService: StorageService
  ) {
    this.newBook = new UserFile("", "", false, "");
    this.newBook.userEmail = localStorage.getItem('user_email') || "user_not_logged_in";
  }

  saveBook() {
    alert("Book saved:"+ this.newBook.book_title);
    this.dialogRef.close(this.newBook);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  fileBrowserHandler(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
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
      this.uploadFile(event.dataTransfer.files[0]);
    }
  }

  private uploadFile(file: File) {
    this.isUploading = true;
    this.storageService.uploadFile(file, this.newBook.userEmail, this.newBook.book_title)
      .subscribe({
        next: (url) => {
          this.newBook.storage_link = url;
          this.isUploading = false;
          console.log('File uploaded successfully:', url);
        },
        error: (err) => {
          console.error('Error uploading file:', err);
          this.isUploading = false;
        },
      });
    this.newBook.storage_link = this.storageService.getFileURL();
  }
}
