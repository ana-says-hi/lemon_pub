import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ChatService} from "../../../services/chat/chat.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel, StreamChat} from "stream-chat";
import type {Event as StreamEvent} from 'stream-chat';
import {ChannelService, ChatClientService, StreamI18nService} from "stream-chat-angular";
import {Offer} from "../../../model/offer";
import type {Attachment} from 'stream-chat';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  // private chatClient!: StreamChat;
  public messages: any[] = [];
  public inputMessage: string = '';
  private channel!: Channel;
  selectedFile: File | null = null;

  loggedUserId: string = '';
  targetUserId: string = '';


  constructor(private chatService: ChatService, public dialogRef: MatDialogRef<ChatComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { targetUserId: string }) {
    this.loggedUserId = localStorage.getItem('user_email')!.replace(/[.@]/g, '_');
    this.targetUserId = data.targetUserId.replace(/[.@]/g, '_');
    console.log(`Logged User ID: ${this.targetUserId}`);
  }

  async ngOnInit() {
    await this.chatService.initializeChat();

    let members: string[] = [this.loggedUserId, this.targetUserId];
    members.sort();

    const channelId = `${members[0]}_${members[1]}`;
    console.log(`Connecting to channel: ${channelId}`);
    this.channel = this.chatService.getClient().channel('messaging', channelId, {
      name: 'General',
      members: [this.loggedUserId, this.targetUserId],
    } as any);

    await this.channel.watch();

    // Listen to new messages
    this.channel.on('message.new', (event: StreamEvent) => {
      if (event.message) {
        this.messages.push(event.message); // Push new messages to the array
      }
    });

    // Load existing messages
    const existing = await this.channel.query();
    this.messages = existing.messages;
  }

  async sendMessage() {
    let attachments: Attachment[] = [];
    if (this.inputMessage.trim() !== '' || this.selectedFile) {
      //const message = await this.channel.sendMessage({ text: this.inputMessage });
      //this.messages.push(message.message);

      if (this.selectedFile) {
        const response = await this.channel.sendFile(this.selectedFile);

        attachments = [
          {
            type: 'file',
            asset_url: response.file,
            title: this.selectedFile.name,
            mime_type: this.selectedFile.type,
          }
        ];
      }

      await this.channel.sendMessage({
        text: this.inputMessage || this.selectedFile?.name || '',
        attachments,
      });

      this.inputMessage = '';
      this.selectedFile = null;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnectUser();
  }
}
