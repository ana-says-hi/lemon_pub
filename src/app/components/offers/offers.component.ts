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
  is_writer: boolean = true;

  constructor(private filesService: FilesServiceService,
              private userService:PeopleServiceService,
              private offerService:OfferService,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('user_type'));
    this.is_writer = localStorage.getItem('user_type') == 'writer' //|| localStorage.getItem('user_type') == 'admin';
    if( !this.is_writer) {
    this.filesService.getFiles().subscribe((data) => {
      this.books = data;
      this.books.forEach((file, index) => {
        this.userService.getUserByEmail(file.userEmail).subscribe((user) => {
          file.displayOwner = user?.first_name + ' ' + user?.last_name;
          //file.userEmail = user?.first_name + ' ' + user?.last_name + ' ('+ user.username+')'
        });
      });
    });
    this.loading=false;
    }
  }

  toggleReadMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
  }

  makeOffer(book: UserFile) {
    const dialogRef = this.dialog
      .open(MakeOfferDialogComponent, {
        height: '400px',
        minWidth: '400px',
        data:{book: book.book_title, autor: book.userEmail}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offerService.addOffer(result).subscribe({
          next: (response) => {
            console.log('Offer added successfully:', response);
          },
          error: (err) => {
            console.error('Error occurred while adding file meta:', err);
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
      data: { targetUserId: userEmail }
    });
  }
}
