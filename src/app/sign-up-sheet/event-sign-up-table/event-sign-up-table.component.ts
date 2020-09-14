import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../core/services/modalService';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-sign-up-table',
  templateUrl: './event-sign-up-table.component.html',
  styleUrls: ['./event-sign-up-table.component.scss']
})

export class EventSignUpTableComponent implements OnInit {
  displayedColumns: string[] = ['volunteer', 'actions'];
  dataSource;
  selectedRow;
  @Input() slots: [];
  @Input() eventType: string;
  @Input() id: string;
  @Input() volunteerList: [];
  @Output() removeUserFromEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() insertStaffNote: EventEmitter<any> = new EventEmitter<any>();
  usersRef:  AngularFireList<any>;
  users: Observable<any[]>;


  constructor(private modalService: ModalService, private db: AngularFireDatabase) {}

  ngOnInit() {    
    this.dataSource = new MatTableDataSource(this.slots);
  }

  prettySlot(slot: string) {
    return parseInt(slot, 10);
  }

  isEmpty(firstName: string, lastName: string, id: string) {
    if(id == 'N/A'){
      return false;
    }
    return !(firstName && lastName);
  }

  onRemoveUserFromEvent(id: string) {
    this.removeUserFromEvent.emit(id);
    // var a;
    // this.usersRef = this.db.list('user');
    // this.users= this.usersRef.snapshotChanges().pipe(
    //   map(changes => changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))));
    // this.users.subscribe(snapshots => {
    //     snapshots.forEach(snapshot => {
    //       if(snapshot.id === id){
    //        a = snapshot.email;
    //        console.log("helllloooo");
    //        console.log(a);
        
    //       }
    //     });
    // });
  }

  onInsertStaffNote(eventId: string, staffNote: string) {
    this.insertStaffNote.emit({'event_id': eventId,
                               'staff_note': staffNote});
  }

  openAddUserModal(row) {
    console.log(row);
    this.modalService.open(row.id, this.eventType, row.event_date_txt, this.volunteerList);
  }
}
