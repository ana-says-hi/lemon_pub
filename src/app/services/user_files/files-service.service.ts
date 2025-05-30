import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserFile} from "../../model/user_file";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {StorageService} from "../file_storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {
  private apiUrl = 'http://localhost:3532/api/user_files'
  user_files: UserFile[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getFiles(): Observable<UserFile[]> {
    // console.log("GET FILES");
    return this.httpClient.get<UserFile[]>(this.apiUrl)
      .pipe(
        tap(response => {
          // console.log('Response from backend:', response);  // Log the response to see the data
          this.user_files = response;
          // console.log('User files:', this.user_files);  // Log the user files
        })
      );
  }

  getFileByUserEmail(email: string): Observable<UserFile[]> {
    //console.log(email);
    return this.httpClient.get<UserFile[]>(`${this.apiUrl}/${email}`)
  }

  addFile(file: UserFile): Observable<UserFile> {
    //console.log(file);
    //this.storageService.uploadFile(event);
    return this.httpClient.post<UserFile>(this.apiUrl, file).pipe(
      //tap(() => console.log('File successfully sent to the backend:', file)),
      catchError(error => {
        console.error('Error adding file:', error);
        return throwError(() => new Error('Failed to add file. Please try again later.'));
      })
    );
  }

  updateFile(selectedBook: UserFile): Observable<UserFile> {
    //console.log(selectedBook);
    const id= selectedBook.book_title+'_'+selectedBook.userEmail;
    return this.httpClient.put<UserFile>(`${this.apiUrl}/${id}`,selectedBook).pipe(
      tap(() => console.log('File successfully updated:', selectedBook)),
      catchError(error => {
        console.error('Error updating file:', error);
        return throwError(() => new Error('Failed to update file. Please try again later.'));
      })
    );
  }

  updateFileGenres(file: UserFile, genres: String[]): Observable<UserFile> {
    console.log('Updating genres for file:', file, 'with genres:', genres);
    const updatedFile = {...file, genres: genres};
    const id = file.book_title + '_' + file.userEmail;
    return this.httpClient.put<UserFile>(`${this.apiUrl}/${id}`, updatedFile).pipe(
      tap(() => console.log('File genres successfully updated:', updatedFile)),
      catchError(error => {
        console.error('Error updating file genres:', error);
        return throwError(() => new Error('Failed to update file genres. Please try again later.'));
      })
    );
  }
}
