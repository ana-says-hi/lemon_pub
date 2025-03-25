export class UserFile {
  //fileID: string;
  userEmail: string;
  bookTitle: string;
  description: string;
  fileType: string;
  //timestamp:string;
  visibility: boolean;

//! THIS IS JUST FOR TESTING
  constructor(userEmail: string, bookTitle: string, description: string, fileType: string) {
    this.userEmail=userEmail;
    this.bookTitle = bookTitle;
    this.description = description;
    this.fileType = fileType;
    this.visibility = true;
  }
}
