// import Date from "$GLOBAL$";
// import { Date } from "global";
export class UserFile {
  //fileID: string;
  userEmail: string;
  book_title: string;
  description: string;
  file_type: string;
  timestamp:string;
  storage_link: string;
  visibility: boolean;
  genres: string[] = [];

//! THIS IS JUST FOR TESTING
  constructor(userEmail: string, bookTitle: string, visibility: boolean, description: string = "TODO: Add this later", fileType: string="default", genres: string[] = []) {
    this.userEmail=userEmail;
    this.book_title = bookTitle;
    this.description = description;
    this.file_type = fileType;
    this.visibility = visibility;
    this.timestamp = new Date().toISOString();
    this.storage_link="default"; //TODO SCHIMBAT ASTA
    this.genres = genres;
  }
}
