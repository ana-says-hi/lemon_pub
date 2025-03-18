import { Component } from '@angular/core';
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {UserFile} from "../../model/user_file";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  books: UserFile[]= [];

  constructor() {
  // private filesService:FilesServiceService
  }

  ngOnInit(): void {
    // this.filesService.getFiles()
    //   .subscribe((books: UserFile[]) => {
    //   this.books = books;
    //   });
    let book1= new UserFile("The Great Gatsby", "A book about bloo bli bli", "pdf");
    this.books.push(book1);
  }

  addBook(){}
}
