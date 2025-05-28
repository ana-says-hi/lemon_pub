import {Component, OnInit} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserFile} from "../../model/user_file";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilesServiceService} from "../../services/user_files/files-service.service";
import {CommonModule} from "@angular/common";
import {AiService} from "../../services/ai/ai.service";
import {Agent} from "../../model/agent";

@Component({
  selector: 'app-ask-ai',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './ask-ai.component.html',
  styleUrl: './ask-ai.component.css'
})
export class AskAiComponent implements OnInit {
  user_email: string;
  books: UserFile[] = [];
  selectedBook: UserFile | null = null;
  selectedLanguage: any;
  selectedBookDescription: string='';
  resultedAgents: Agent[] = [];
  showResponse: boolean = false;

  languages = [
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'French'},
    {value: 'es', viewValue: 'Spanish'},
    {value: 'de', viewValue: 'German'},
    {value: 'it', viewValue: 'Italian'},
    {value: 'pt', viewValue: 'Portuguese'},
    {value: 'zh', viewValue: 'Chinese'},
    {value: 'ja', viewValue: 'Japanese'},
    {value: 'ru', viewValue: 'Russian'},
  ];


  constructor(private userFileService: FilesServiceService, private aiService: AiService) {
    this.user_email = localStorage.getItem('user_email') || "user_not_logged_in";
  }

  ngOnInit(): void {
    console.log('User email:', this.user_email);
    //this.user_email = localStorage.getItem('user_email') || "user_not_logged_in";
    this.userFileService.getFileByUserEmail(this.user_email).subscribe((data: UserFile[]) => {
      this.books = data;
    });
  }
  saveDescription() {
    console.log('Saving description:', this.selectedBookDescription);
    if (this.selectedBook) {
      this.selectedBook.description = this.selectedBookDescription;
      //console.log('Saving description:', this.selectedBook.description);
      this.userFileService.updateFile(this.selectedBook).subscribe((response) => {
        //console.log('Description saved successfully:', response);
        alert('Description saved successfully!');
      }, (error) => {
        console.error('Error saving description:', error);
      });
    }
  }

  onBookChange() {
    this.selectedBookDescription = this.selectedBook ? this.selectedBook.description : '';
    console.log('Selected book description:', this.selectedBookDescription);
  }

  matchDescription() {
    if (this.selectedBook) {
      this.aiService.matchBook(this.selectedBook.description).subscribe((response: any) => {
        // console.log('AI response:', response);
        // alert('AI response: ' + response);
        this.resultedAgents = response.map((agent: any) => ({
          name: agent.name,
          genres: agent.genres,
          profileLink: agent.profile_link,
          similarity: agent.similarity
        }));
        console.log('Resulted agents:', this.resultedAgents);
        this.showResponse=true;
      }, (error) => {
        console.error('Error matching description:', error);
      });
    } else {
      alert('Please select a book first.');
    }
  }
}
