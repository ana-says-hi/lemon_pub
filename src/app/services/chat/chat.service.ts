import { Injectable } from '@angular/core';
import { StreamChat } from 'stream-chat';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PeopleServiceService } from '../peeps/people-service.service';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatClient!: StreamChat;
  private readonly apiUrl = 'http://localhost:3532/api/token';
  private readonly apiKey = 'e68jgsvrj387';

  constructor(
    private httpClient: HttpClient,
    private peopleService: PeopleServiceService
  ) {}

  async initializeChat(): Promise<void> {
    const email = localStorage.getItem('user_email');
    if (!email) throw new Error('No user email found');

    const user: User = await firstValueFrom(this.peopleService.getUserByEmail(email));
    if (!user) throw new Error('User not found');

    const token = await this.fetchToken(email);

    const userId = email.replace(/[.@]/g, '_');

    this.chatClient = StreamChat.getInstance(this.apiKey);
    await this.chatClient.connectUser(
      {
        id: userId,
        name: user.username,
      },
      token
    );

    console.log(`Connected as ${userId}`);
  }

  createChatUser(email: string, username: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.fetchToken(email);
        const userId = email.replace(/[.@]/g, '_');

        this.chatClient = StreamChat.getInstance(this.apiKey);
        await this.chatClient.connectUser(
          {
            id: userId,
            name: username,
          },
          token
        );
        resolve();
      } catch (error) {
        console.error('Error creating chat user:', error);
        reject(error);
      }
    });
  }

  async disconnectUser(): Promise<void> {
    if (this.chatClient) {
      await this.chatClient.disconnectUser();
    }
  }

  getClient(): StreamChat {
    return this.chatClient;
  }

  private async fetchToken(email: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpClient.get<{ token: string }>(`${this.apiUrl}/${email}`)
    );
    return response.token;
  }
}
