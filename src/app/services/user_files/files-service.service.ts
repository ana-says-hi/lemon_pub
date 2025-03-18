import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserFile} from "../../model/user_file";

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {
  private apiUrl = 'http://localhost:3532/api/user_files'

  constructor(private httpClient: HttpClient) { }

  getFiles():Observable<UserFile[]>{
    return this.httpClient.get<UserFile[]>(this.apiUrl);
  }

  getFileByUserId(id: number){
    return this.httpClient.get(this.apiUrl + id);
  }
}
