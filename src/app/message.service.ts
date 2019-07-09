import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: Message[] = [];

  constructor() { }

  add(message: Message): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
