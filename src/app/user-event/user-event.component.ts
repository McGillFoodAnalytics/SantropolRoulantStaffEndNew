import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FirebaseService } from "../firebase-service.service";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { map } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../shared/models/user";

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
  private myForm: FormGroup;
  private model = new User();

  private modalReference;

  @Input() userId: string;

  constructor(
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.events = this.firebase.getEvents();
    this.cancelledEvents = this.firebase.getCancelledEvents();
    this.pastEvents = this.firebase.getPastEvents();
    this.firebase.getUser(this.userId).subscribe((element) => {
      this.element = element;
      this.model = element;
    });
    this.displayCurrentEvents(this.userId);
    this.displayPastEvents(this.userId);
    this.displayCancellation(this.userId);

    this.myForm = this.formBuilder.group({
      dob: ["", Validators.required],
      address_number: ["", Validators.required],
      address_street: ["", Validators.required],
      address_city: ["", Validators.required],
      address_postal_code: ["", Validators.required],
      email: ["", Validators.required],
      phone_number: ["", Validators.required],
      emergency_contact_name: ["", Validators.required],
      emergency_relationship: ["", Validators.required],
      emergency_contact_number: ["", Validators.required],
    });
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
    });
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
  formatDate(date) {
    if (date == null) {
      return "";
    }
    if (date.constructor == Date) {
      let month = date.getMonth().toString();
      let day = date.getDate().toString();
      let year = date.getFullYear().toString();

      return month + "/" + day + "/" + year;
    } else if (date.constructor == String) {
      const year = date.substring(0, 4);
      const month = date.substring(5, 7);
      const day = date.substring(8, 10);
      date = month + "/" + day + "/" + year;
      return date;
    }
  }

  formatSignupDate(date: string) {
    let year = "20" + date.substring(0, 2);
    let day = date.substring(6);
    let month = date.substring(3, 5);
    return month + "/" + day + "/" + year;
  }

  formatEventId(eventId: string) {
    let code1 = eventId.substring(0, 6);
    let day = code1.substring(4);
    let month = code1.substring(2,4);
    let year = code1.substring(0,2);
    let date = month + '/' + day + '/' + year;
    
    let code2 = eventId.substring(11);
    let event = eventId.substring(6, 11);
    let newId;
    switch (event) {
      case "kitam":
        newId = date + " Kitchen AM-" + code2;
        break;
      case "kitpm":
        newId = date + " Kitchen PM-" + code2;
        break;
      case "deldr":
        newId = date + " Delivery Driver-" + code2;
        break;
      case "deliv":
        newId = date + " Delivery-" + code2;
        break;
      case "kitas":
        newId = date + " Kitchen AM Sat-" + code2;
        break;
      case "kitps":
        newId = date + " Kitchen PM Sat-" + code2;
        break;
      case "delds":
        newId = date + " Delivery Driver Sat-" + code2;
        break;
      case "delis":
        newId = date + " Delivery Sat-" + code2;
        break;
    }
    return newId;
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

  updateUser(user) {
    this.db.object("/user/" + this.userId).update({
      address_city: user.address_city,
      address_number: user.address_number,
      address_postal_code: user.address_postal_code,
      address_street: user.address_street,
      dob: user.dob,
      email: user.email,
      phone_number: user.phone_number,
      emergency_contact_number: user.emergency_contact_number,
      emergency_contact_name: user.emergency_contact_name,
      emergency_relationship: user.emergency_relationship,
    });
  }

  onSave() {
    //console.log(this.model.phone_number);
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.updateUser(this.model);
      this.modalReference.close();
    }
  }
}
