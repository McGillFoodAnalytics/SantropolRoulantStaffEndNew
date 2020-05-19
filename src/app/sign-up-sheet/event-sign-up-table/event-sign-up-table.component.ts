import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../core/services/modalService';

@Component({
  selector: 'app-event-sign-up-table',
  templateUrl: './event-sign-up-table.component.html',
  styleUrls: ['./event-sign-up-table.component.scss']
})

export class EventSignUpTableComponent implements OnInit {
  displayedColumns: string[] = ['slot', 'volunteer', 'actions'];
  dataSource;
  selectedRow;
  @Input() slots: [];
  @Input() eventType: string;
  @Input() volunteerList: [];
  @Output() removeUserFromEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() insertStaffNote: EventEmitter<any> = new EventEmitter<any>();


  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.slots);
  }

  prettySlot(slot: string) {
    return parseInt(slot, 10);
  }

  isEmpty(firstName: string, lastName: string) {
    return !(firstName && lastName);
  }

  onRemoveUserFromEvent(id: string) {
    this.removeUserFromEvent.emit(id);
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
