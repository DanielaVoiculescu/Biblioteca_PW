import { Injectable } from '@angular/core';
import {Message} from 'primeng/api';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMessageService {

  msg = new BehaviorSubject<Message | null>(null);

  constructor() { }

  addMessage(message: Message): void{
    this.msg.next(message);
  }

  clearMessages(): void{
    this.msg.next(null);
  }
}
