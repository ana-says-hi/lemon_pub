import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  users: User[] = [];

  private apiUrl = 'http://localhost:5433/api/peeps'
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  getUserById(id: number) : Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + id);
  }
  getUserByUsername(username: string){
    let id=-1;
    for (let user of this.users){
      if (user.username === username){
        id = user.id;
      }
    }
    return id;
  }
  getUserByEmail(email: string){
    let id=-1;
    for (let user of this.users){
      if (user.email === email){
        id = user.id;
      }
    }
    return id;
  }
  addUser(user: User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, user);
  }
  deleteUser(id: number):Observable<User>
  {
    return this.httpClient.delete<User>(this.apiUrl + id);
  }
  updateUser(user: User){}

}

