import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from "@angular/material/table";
import { ModalService } from "../../core/services/modalService";
import { FirebaseService } from "../../firebase-service.service";
import { Observable } from "rxjs";
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: "app-add-user-to-event",
  templateUrl: "./add-user-to-event.component.html",
  styleUrls: ["./add-user-to-event.component.scss"],
})
export class AddUserToEventComponent implements OnInit {
  private eventType: string;
  private eventTypeCode: string;
  private date: string;
  private event_id: string;
  private modalReference;
  private modalReference2;
  private displayedColumns: string[] = ["first_name", "last_name", "email"];
  private dataSource;
  private addUser: boolean;
  private eventsRef = [];
  private validEvent = [];
  private Events: Observable<any>;
  private selectedRowIndex: Number;
  private selectedRow: any = {};
  private loadedEvents: boolean;
  private firstShiftChecked = false;
  @ViewChild("addUserModal", { static: true }) modalTemplate: TemplateRef<any>;
  @ViewChild("addUserModalWarning", { static: true })
  modalTemplateWarning: TemplateRef<any>;

  constructor(
    private fs: FirebaseService,
    private modalService: NgbModal,
    private myModalService: ModalService
  ) {}

  ngOnInit() {
    this.myModalService.set(this);
    this.loadedEvents = false; //boolean used to load all events from database only once
  }

  open(event_id, eventType: string, date: string, volunteerList: any) {
    this.eventType = eventType;
    this.eventTypeCode = this.getEventCode(eventType);
    this.date = date;
    this.event_id = event_id;
    this.isBefore();
    this.dataSource = new MatTableDataSource(volunteerList);
    this.modalReference = this.modalService.open(this.modalTemplate, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      windowClass: "my-class",
      centered: true,
    });

    // Loading all events to get the events of the selected day and event type
    // Done only once using loadedEvents boolean
    let eventSubstring = "";

    if (!this.loadedEvents) {
      this.Events = this.fs.getEvents();
      this.Events.subscribe((event) => {
        this.eventsRef = event;
      });
      this.loadedEvents = true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setClickedRow(index, row) {
    this.selectedRowIndex = index;
    this.selectedRow = row;
  }

  openWarning() {
    this.modalReference2 = this.modalService.open(this.modalTemplateWarning, {
      ariaLabelledBy: "modal-basic-title",
      size: "md",
      centered: true,
    });
  }
  onCheckboxChange(ob: MatCheckboxChange) {
    console.log("Checked " + ob.checked)
    this.firstShiftChecked = ob.checked
  }
  onSubmit(warned: boolean) {
    if (this.alreadyRegistered() && !warned) {
      this.openWarning();
      return;
    } else if (this.selectedRowIndex >= 0) {
      this.modalReference.close();
      if (warned) {
        this.modalReference2.close();
      }
      this.fs.addUserToEvent(
        this.event_id,
        this.selectedRow.first_name,
        this.selectedRow.last_name,
        this.selectedRow.id,
        this.selectedRow.key,
        this.firstShiftChecked,
      );
      this.selectedRowIndex = -1;
      this.selectedRow = {};
    }
  }

  // Check if a volunteer to be added is already registered for the same event, same day
  alreadyRegistered() {
    let eventSubstring;
    for (let i = 0; i < this.eventsRef.length - 1; i++) {
      eventSubstring = this.eventsRef[i].id.substring(0, 11);
      if (eventSubstring == this.event_id.substring(0, 11)) {
        if (
          this.eventsRef[i].first_name == this.selectedRow.first_name &&
          this.eventsRef[i].last_name == this.selectedRow.last_name
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getEventCode(event) {
    if (event == "Kitchen AM") {
      return "kitam";
    }
    if (event == "Kitchen PM") {
      return "kitpm";
    }
    if (event == "Delivery Driver") {
      return "deldr";
    }
    if (event == "Delivery") {
      return "deliv";
    }
  }

  // Method to check whether today is before or the same day of the selected event's date
  isBefore() {
    let year = "20" + this.event_id.substring(0, 2);
    let month = this.event_id.substring(2, 4);
    let day = this.event_id.substring(4, 6);

    let eventDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    let today = new Date();

    if (today.getMonth() < eventDate.getMonth()) {
      this.addUser = true;
    } else if (today.getMonth() == eventDate.getMonth()) {
      if (today.getDate() <= eventDate.getDate()) {
        this.addUser = true; //Boolean used in HTML
      }
    } else {
      this.addUser = false;
    }
  }
}
