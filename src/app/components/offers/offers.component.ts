import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserFile} from "../../model/user_file";
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {MatDialog} from "@angular/material/dialog";
import {PeopleServiceService} from "../../services/peeps/people-service.service";

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
  books: UserFile[] = [];
  showMore: boolean[] = [];
  loading:boolean=true;

  constructor(private filesService: FilesServiceService,
              private userService:PeopleServiceService,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.filesService.getFiles().subscribe((data) => {
      this.books = data;
      this.books.forEach((file, index) => {
        this.userService.getUserByEmail(file.userEmail).subscribe((user) => {
          file.userEmail = user?.first_name + ' ' + user?.last_name + ' ('+ user.username+')'
        });
      });
    });
    this.loading=false;
  }

  toggleReadMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
  }

  makeOffer(book: UserFile) {
    
  }
}
