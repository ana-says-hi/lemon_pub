import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {UserFile} from "../../model/user_file";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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

  // getFileByUserEmail(email: string): Observable<UserFile[]> {
    // return this.httpClient.get(this.apiUrl + email);
  // }


}
