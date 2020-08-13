import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {FirebaseService} from '../firebase-service.service';
import {Observable} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  private displayedColumns: string[] = [ 'event_data_text', 'event_type', 'event_time_start', 'event_time_end'];

  volunteers: Observable<any[]>;
  events: Observable<any[]>;
  pastEvents: Observable<any[]>;
  pastEventsUser: any;
  currentEventsUser: any;
  element:any;

  private modalReference;

  @Input() userId: string;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private firebase: FirebaseService ) {
  }

  ngOnInit() {

    this.events = this.firebase.getEvents();
    this.pastEvents = this.firebase.getPastEvents();
    this.element = this.firebase.getUser(this.userId);
    this.displayCurrentEvents(this.userId);
    this.displayPastEvents(this.userId);

  }
  capitalize(str: string) {
    return str.toUpperCase();
  }
  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  prettify(str: string) {
    return str.replace('_', ' ');
  }

  displayPastEvents(userId){
    this.pastEventsUser = [];
    this.pastEvents.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
            if(snapshot.uid == userId){ //if the model has past events
              this.pastEventsUser.push(snapshot); //push it to pastEvents
            }
        });
    })
  }

  displayCurrentEvents(userId){
    this.currentEventsUser = [];

    this.events.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
      if(!this.containsObject(snapshot, this.currentEventsUser)){
            if(snapshot.uid == userId){ //if the model has past events
              this.currentEventsUser.push(snapshot); //push it to pastEvents
            }
          }
        });
    }) //
  }

  containsObject(obj, list) : boolean {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
  }

}




//useful method
// formatDate(date: string){
//   const year = "20" + date.substring(0,2);
//   const month = date.substring(2,4);
//   const day = date.substring(4,6);
//   date = month+'/'+day+'/'+year;
//   return date;
// }
