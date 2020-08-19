import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FirebaseService } from "../firebase-service.service";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { map } from "rxjs/operators";

@Component({
  selector: "app-user-event",
  templateUrl: "./user-event.component.html",
  styleUrls: ["./user-event.component.scss"],
})
export class UserEventComponent implements OnInit {
  private displayedColumns: string[] = [
    "event_data_text",
    "event_type",
    "event_time_start",
    "event_time_end",
  ];
  volunteers: Observable<any[]>;
  events: Observable<any[]>;
  pastEvents: Observable<any[]>;
  cancelledEvents: Observable<any[]>;
  pastEventsUser: any;
  currentEventsUser: any;
  cancelledEventsUser: any;
  elementA: any;
  element: any;
  user: any;

  private modalReference;

  @Input() userId: string;

  constructor(
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    this.events = this.firebase.getEvents();
    this.cancelledEvents = this.firebase.getCancelledEvents();
    this.pastEvents = this.firebase.getPastEvents();
    this.firebase.getUser(this.userId).subscribe((element) => {
      this.element = element;
    });
    this.displayCurrentEvents(this.userId);
    this.displayPastEvents(this.userId);
    this.displayCancellation(this.userId);
  }
  capitalize(str: string) {
    return str.toUpperCase();
  }
  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });
  }

  prettify(str: string) {
    return str.replace("_", " ");
  }

  displayPastEvents(userId) {
    this.pastEventsUser = [];
    this.pastEvents.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.uid == userId) {
          //if the model has past events
          this.pastEventsUser.push(snapshot); //push it to pastEvents
        }
      });
    });
  }

  displayFirstName() {
    this.element = this.firebase.getUser(this.userId);
    console.log(this.element);
  }

  displayCurrentEvents(userId) {
    this.currentEventsUser = [];
    this.events.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (!this.containsObject(snapshot, this.currentEventsUser)) {
          if (snapshot.uid == userId) {
            //if the model has past events
            this.currentEventsUser.push(snapshot); //push it to pastEvents
          }
        }
      });
    }); //
  }

  displayCancellation(userId) {
    this.cancelledEventsUser = [];
    this.cancelledEvents.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.user_id == userId) {
          this.cancelledEventsUser.push(snapshot);
        }
      });
    });
  }

  containsObject(obj, list): boolean {
    var x;
    for (x in list) {
      if (list.hasOwnProperty(x) && list[x] === obj) {
        return true;
      }
    }

    return false;
  }

  //useful method
  formatDate(date: string) {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    date = month + "/" + day + "/" + year;
    return date;
  }

  indentRight(str: string, label: string) {
    let buffer = "";
    let amount = 40 - label.length;
    //console.log(amount);

    for (let i = 0; i < amount - 1; i++) {
      buffer += " ";
    }
    return buffer + str;
  }

  prettifyNumber(str: string) {
    if (str == null) {
      return "-";
    }
    let a = str.substring(0, 3);
    let b = str.substring(3, 6);
    let c = str.substring(6, 10);
    let phoneNumber = "(" + a + ") " + b + "-" + c;
    return phoneNumber;
  }

  emergency(user) {
    let contact_name;
    let contact_rel;
    if (user.emergency_contact_name == null) {
      return "-";
    } else {
      contact_name = user.emergency_contact_name;
      contact_rel = user.emergency_relationship;
    }
    return contact_name + " (" + contact_rel + ")";
  }

  //function is used to display 0 if cancellations property does not exists on user
  valid(num: number) {
    if (num) {
      return num;
    } else {
      return 0;
    }
  }
}
