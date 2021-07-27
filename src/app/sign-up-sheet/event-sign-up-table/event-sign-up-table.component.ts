import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ModalService } from "../../core/services/modalService";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FirebaseService } from "../../firebase-service.service";

@Component({
  selector: "app-event-sign-up-table",
  templateUrl: "./event-sign-up-table.component.html",
  styleUrls: ["./event-sign-up-table.component.scss"],
})
export class EventSignUpTableComponent implements OnInit {
  displayedColumns: string[] = ["volunteer", "actions"];
  dataSource;
  selectedRow;
  modalReference;
  @Input() slots: [any];
  @Input() eventType: string;
  @Input() id: string; //used to display empty block on Thursdays
  @Input() volunteerList;
  @Output() removeUserFromEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() insertStaffNote: EventEmitter<any> = new EventEmitter<any>();
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;

  constructor(
    private modalService: ModalService,
    private ngModalService: NgbModal,
    private db: AngularFireDatabase,
    private fs: FirebaseService
  ) {}

  ngOnInit() {
    //update staff_note field with note field(entered by user in mobile app)
    this.slots.forEach((element) => {
      if (element.note && !element.staff_note) {
        element.staff_note = '"' + element.note + '"';
      }
    });
    this.dataSource = new MatTableDataSource(this.slots);
  }

  prettySlot(slot: string) {
    return parseInt(slot, 10);
  }

  isEmpty(firstName: string, lastName: string, id: string) {
    if (id == "N/A") {
      return false;
    }
    return !(firstName && lastName);
  }

  onRemoveUserFromEvent(id: string) {
    this.removeUserFromEvent.emit(id);
  }

  onInsertStaffNote(eventId: string, staffNote: string) {
    this.insertStaffNote.emit({ event_id: eventId, staff_note: staffNote });
  }

  openAddUserModal(row) {
    this.modalService.open(
      row.id,
      this.eventType,
      row.event_date_txt,
      this.volunteerList
    );
  }

  openMarkAsLateModal(content) {
    this.modalReference = this.ngModalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "md",
      centered: true,
    });
  }

  markAsLate(shiftId) {
    this.fs.markLate(shiftId);
    return;
  }
}
