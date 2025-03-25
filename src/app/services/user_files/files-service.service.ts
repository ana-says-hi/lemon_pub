import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserFile} from "../../model/user_file";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {
  private apiUrl = 'http://localhost:3532/api/user_files'
  books: UserFile[] = [];

  constructor(private httpClient: HttpClient) {
    this.getFiles().subscribe((data) => {
      this.books = data;
    });
  }

  getFiles():Observable<UserFile[]>{
    return this.httpClient.get<UserFile[]>(this.apiUrl);
  }

  getFileByUserId(id: number){
    return this.httpClient.get(this.apiUrl + id);
  }
}
