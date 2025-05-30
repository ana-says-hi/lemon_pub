import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Agent} from "../../model/agent";
import {FilesServiceService} from "../user_files/files-service.service";
import {UserFile} from "../../model/user_file";

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private url = 'http://127.0.0.1:5000';
  matchedAgents: Agent[] = [];

  constructor(private http: HttpClient, private filesService: FilesServiceService) {
  }

  matchBook(bookDescription: string) {  //, language: string
    return this.http.post(`${this.url}/match`,
      {description: bookDescription}) //, language: 'en'
      .pipe(tap((response: any) => {
        this.matchedAgents = response.map((agent: any) => ({
          name: agent.name,
          genres: agent.genres,
          profileLink: agent.profile_link,
          similarity: agent.similarity
        }) as Agent);
        console.log('Matched editors:', this.matchedAgents);
      }));
  }

  classifyBook(book: UserFile) {
    return this.http.post(`${this.url}/classify`, {description: book.description})
      .pipe(tap((response: any) => {
        console.log('Classification response:', response);
        response.genres = response.genres.map((genre: any) => genre.label.toLowerCase());
        this.filesService.updateFileGenres(book, response.genres).subscribe((updatedFile) => {
        });
      }))
  }
}
