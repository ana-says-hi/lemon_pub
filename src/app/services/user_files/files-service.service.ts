import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserFile} from "../../model/user_file";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileStorageService} from "../file_storage/file-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {
  private apiUrl = 'http://localhost:3532/api/user_files'
  user_files: UserFile[] = [];

  constructor(private httpClient: HttpClient,) { // private storageService: FileStorageService
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
    console.log(email);
    return this.httpClient.get<UserFile[]>(`${this.apiUrl}/${email}`)
  }

  addFile(file: UserFile): Observable<UserFile> {
    console.log("ADD FROM SERVICE");
    // return this.httpClient.post<UserFile>(this.apiUrl, file)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('File to be added:', file);
    console.log('API URL:', this.apiUrl);

    //return this.httpClient.post<UserFile>(this.apiUrl, file);

    return this.httpClient.post<UserFile>(this.apiUrl, file, { headers }).pipe(
      tap(response => {
        console.log('File successfully added:', response);
      }),
      catchError(error => {
        console.error('Error adding file:', error);
        return throwError(() => error);
      })
    );

  }

}
