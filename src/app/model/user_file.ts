export class UserFile{
  //fileID: string;
  //userID: string;
  bookTitle:string;
  description: string;
  fileType:string;
  //timestamp:string;
  visibility:boolean;

//! THIS IS JUST FOR TESTING
  constructor(bookTitle: string, description: string, fileType: string) {
    this.bookTitle = bookTitle;
    this.description = description;
    this.fileType = fileType;
    this.visibility = true;
  }
}
