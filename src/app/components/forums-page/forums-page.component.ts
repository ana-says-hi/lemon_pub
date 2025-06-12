import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './forums-page.component.html',
  styleUrl: './forums-page.component.css'
})
export class ForumsPageComponent {
  topics$: Observable<any>;
  newTopicName = '';

  constructor(private afs: AngularFirestore, private router: Router) {
    this.topics$ = this.afs.collection('topics').valueChanges({ idField: 'id' });
  }

  async createTopic() {
    if (!this.newTopicName.trim()) return;

    const topicsRef = this.afs.collection('topics');
    const docRef = await topicsRef.add({
      name: this.newTopicName,
      createdAt: new Date()
    });

    this.newTopicName = '';
    this.router.navigate(['/forums', docRef.id]);
  }
}
