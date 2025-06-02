import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ChatService} from "../../../services/chat/chat.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages$: Observable<any[]>;
  messageText = '';
  chatOpen = false;

  constructor(private chatService: ChatService) {
    this.messages$ = this.chatService.getMessages();
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText, 'User123');
      this.messageText = '';
    }
  }
}
