import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {UserFile} from "../../model/user_file";
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddBookDialogComponent} from "../add-book-dialog/add-book-dialog.component";
import {reload} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent implements OnInit {
  books: UserFile[] = [];//= new Observable<UserFile[]>();
  // showMore: boolean = false;
  showMore: boolean[] = [];
  email: string = localStorage.getItem('user_email') || '';

  constructor(private filesService: FilesServiceService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    //this.filesService.getFiles().subscribe((data) => {
    this.filesService.getFileByUserEmail(this.email).subscribe((data) => {
      this.books = data;
    });
    // console.log(this.books);
  }

  addBook() {
    const dialogRef = this.dialog
      .open(AddBookDialogComponent, {
        height: '500px',
        minWidth: '700px'
        //panelClass: 'custom-dialog-container'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filesService.addFile(result).subscribe({
          next: (response) => {
            console.log('File meta added successfully:', response);
          },
          error: (err) => {
            console.error('Error occurred while adding file meta:', err);
          }
        });

        //window.location.reload();
      }
    });
  }

  getFileTypeIcon(type: string): string {
    // console.log(type);
    switch (type) {
      case 'pdf':
        return 'assets/icons-ish/pdf.png';
      case 'txt':
        return 'assets/icons-ish/txt.png';
      case 'word':
        return 'assets/icons-ish/word.png';
      default:
        return 'assets/icons-ish/document.png';
    }
  }

  toggleReadMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
  }

}
