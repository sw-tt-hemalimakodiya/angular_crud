import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(Message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: Message });
  }
  showInfo(Message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: Message });
  }

  showWarn(Message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: Message });
  }
  showError(Message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: Message });
  }
}
