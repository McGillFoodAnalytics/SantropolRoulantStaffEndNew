import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal: any;

  set(modal: any) {
    this.modal = modal;
  }

  open(event_id: string, eventType: string, date: string, volunteerList: any) {
    console.log(this.modal);
    this.modal.open(event_id, eventType, date, volunteerList);
  }
}
