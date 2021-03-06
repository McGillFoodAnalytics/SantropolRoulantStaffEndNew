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
    this.loadedEvents = false;
     //boolean used to load all events from database only once
  }

  ngAfterViewInit() {
    //sub.unsubscribe();
    this.fs.getUsers().subscribe(snapshots => {
      snapshots.forEach(element => {
        //Add new field to the list of vols that contains first and last name separated by a space, used for filtering. The field .a is important, since filter applies to fields ordered in alphabetical order
        // The normalize("NFD").replace(/[\u0300-\u036f]/g, "") uses a regex character class to ignore special characters such as accents
        element.a = element.first_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + " " + element.last_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      });
    this.dataSource = new MatTableDataSource(snapshots);
    });
  }


  open(event_id, eventType: string, date: string, volunteerList: any) {
    this.eventType = eventType;
    this.eventTypeCode = this.getEventCode(eventType);
    this.date = date;
    this.event_id = event_id;
    this.isBefore().then(() => {
      //Determine window size based on adding user window or passed shift 
      var windowClass = (this.addUser) ? "add-user" : "passed-shift";
      this.dataSource = new MatTableDataSource(volunteerList);
      this.modalReference = this.modalService.open(this.modalTemplate, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: windowClass,
        centered: true,
      });
    });
    
    // Loading all events to get the events of the selected day and event type
    // Done only once using loadedEvents boolean
    if (!this.loadedEvents) {
      this.Events = this.fs.getEvents();
      let sub = this.Events.subscribe((event) => {
        this.eventsRef = event;
        sub.unsubscribe();
      });
      this.loadedEvents = true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  setClickedRow(index, row) {
    this.selectedRowIndex = index;
    this.selectedRow = row;
  }

  openWarning() {
    this.modalReference2 = this.modalService.open(this.modalTemplateWarning, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "duplicateUserWarning",
      centered: true,
    });
  }

  onCheckboxChange(ob: MatCheckboxChange) {
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
  async isBefore(): Promise<void> {
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
      return;
    } 
    else if (today.getMonth() == eventDate.getMonth()) {
      if (today.getDate() <= eventDate.getDate()) {
        this.addUser = true; //Boolean used in HTML to hide/show a div
      }
      else { 
        this.addUser = false;
      }
      return;
    } 
  }
}
