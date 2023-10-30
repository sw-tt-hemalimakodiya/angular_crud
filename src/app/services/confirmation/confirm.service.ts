import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private confirmationService: ConfirmationService) { }

  confirmDelete(data: object, cb:any) {
    console.log("ConfimDelete model");
    console.log(data);
    
    this.confirmationService.confirm({
      ...data,
      accept : () => {
        return cb();
      }
    })
  }
}
