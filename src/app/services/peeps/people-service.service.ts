import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  users: User[] = [];
  private apiUrl = 'http://localhost:3532/api/peeps'

  constructor(private httpClient: HttpClient) {
    this.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${email}`);
    // return this.httpClient.get<User>(`/api/peeps/${encodeURIComponent(email)}`);
  }

  getUserByUsername(username: string) {
    //let id=-1;
    // this.getUsers();
    for (let user of this.users) {
      if (user.username == username) {
        return user;
        //id = user.id;
      }
    }
    return null;
    //return id;
  }

  // getUserByEmail(email: string): User | null {
  //   // let id=-1;
  //   for (let user of this.users) {
  //     if (user.email == email) {
  //       //id = user.id;
  //       console.log("here");
  //       return user;
  //     }
  //   }
  //   return null;
  //   // return id;
  // }

  addUser(user: User)//:Observable<User>{
  {
    //console.log("KILLL MEEEEEEEE",user);
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.apiUrl + id);
  }

  updateUser(user: User) {
  }

}

