import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FirebaseService } from "../firebase-service.service";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
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
  displayForm: boolean;
  validId: boolean;
  private myForm: FormGroup;
  private model = new User();
  private modalReference;
  private modalReference2;
  
  eventTypes = {
    kitam: "Kitchen AM",
    kitpm: "Kitchen PM",
    deldr: "Delivery Driver",
    deliv: "Delivery",
  };

  @Input() userId: string;
  @Output() removeUserFromEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('deleteUser', {static: true}) modalTemplateWarning: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.validId = true;
    this.displayForm = false;
    this.events = this.firebase.getEvents();
    this.cancelledEvents = this.firebase.getCancelledEvents();
    this.pastEvents = this.firebase.getPastEvents();
 
    this.firebase.getUser(this.userId).subscribe((element) => {
      this.element = element;
      this.model = element;
      if(element == null){
        this.validId = false; //Do not display user profile
      }
      else {
        this.checkBox();
      }
    });

    this.displayCurrentEvents(this.userId);
    this.displayPastEvents(this.userId);
    this.displayCancellation(this.userId);

    var phoneNumPattern = new RegExp("^[0-9]{10}$");

    this.myForm = this.formBuilder.group({
      dob: ["", Validators.required],
      address_number: ["", Validators.required],
      address_street: ["", Validators.required],
      address_city: ["", Validators.required],
      address_postal_code: ["", Validators.required],
      email: ["", Validators.required],
      phone_number: ["", Validators.pattern(phoneNumPattern)],
      emergency_contact_name: ["", ],
      emergency_relationship: ["", ],
      emergency_contact_number: ["", Validators.pattern(phoneNumPattern)],
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

  openWarning(){
    this.modalReference2 = this.modalService.open(this.modalTemplateWarning, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true});
  }

  //When deleting a user is confirmed
  onDelete(){
    this.firebase.deleteUser(this.userId);
    this.modalReference2.close();
  }

  openEditForm(){
    this.displayForm = !this.displayForm;
  }

  prettify(str: string) {
    return str.replace("_", " ");
  }

  changeActiveStatus(){
    if(this.element.active_status == null){
    this.firebase.changeActiveStatus(this.userId, false);
    }
    else{
      this.firebase.changeActiveStatus(this.userId, !this.element.active_status);
    }
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

  //Used for birthdate
  formatDate(date) {
    if (date == null) {
      return "";
    }
    if (date.constructor == Date) {
      let month = date.toLocaleString('default', { month: 'long' });
      let day = date.getDate().toString();
      let year = date.getFullYear().toString();

      return month + " " + day + ", " + year;
    } 
    else if (date.constructor == String) {
      let month, day;
      const year = date.substring(0, 4);
      if (date.length == 8){
        month = date.substring(4, 6);
        day = date.substring(6, 8);
      }
      else{
        month = date.substring(5, 7);
        day = date.substring(8, 10);
      }
      // Create Date type to extract month in string format easily
      const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      let monthName = newDate.toLocaleString('default', { month: 'long' });

      date =  monthName + " " + day + ", " + year;
      return date;
    }
  }

  formatSignupDate(date: string) {
    let year = "20" + date.substring(0, 2);
    let day = date.substring(6);
    let month = date.substring(3, 5);
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    let month2 = newDate.toLocaleString('default', { month: 'long' });
    date =  month2 + " " + day + ", " + year;
    return date;
  }

  //Used to format event type for cancelled events
  formatEventId(eventId: string) {
    let event = eventId.substring(6, 11);
    return this.eventTypes[event];
  }

  prettifyNumber(str: string) {
    if (str == null || str == "") {
      return "-";
    }
    if(str.length == 10){
      let a = str.substring(0, 3);
      let b = str.substring(3, 6);
      let c = str.substring(6, 10);
      let phoneNumber = "(" + a + ") " + b + "-" + c;
      return phoneNumber;
    }
    else{
      return str;
    }
  }

  //Format emergency contact info 
  emergency(user) {
    let contact_name;
    let contact_rel;
    if (user.emergency_contact_name == null || user.emergency_contact_name == "") {
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
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.updateUser(this.getUpdatedUser());
      this.displayForm = !this.displayForm;
    }
  }

  // Method to check the box of volunteer if they are have active status
  checkBox(){
    if(this.element.active_status || this.element.active_status == null){
      let statusCheckBox = document.getElementById("statusCheck") as HTMLInputElement;
      statusCheckBox.checked = true;
    }
  }

  formatEventDate(eventId: string) {
    // code1 is the part of the eventId that contains data specific to date
    let code1 = eventId.substring(0, 6);

    let day = code1.substring(4);
    let month = code1.substring(2,4);
    let year = "20" + code1.substring(0,2);
  
    // Create Date type to extract month in string format easily
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // MonthName is the month in plain language, i.e. January
    let monthName = newDate.toLocaleString('default', { month: 'long' });
    let date =  monthName + " " + day + ", " + year;
    return date;
  }

  onRemoveUserFromEvent(id: string) {
    this.firebase.removeUserFromEvent(id);
    this.removeUserFromEvent.emit(id);
  }
  
  /**
   * Used for formatting current and future shift types
   * @param {string} eventType : short format of the type of shift(event)
   * @returns {string} : long format of type of shift 
   */
  formatEventType(eventType: string){
    return this.eventTypes[eventType];   
  }

  getUpdatedUser(): User {
    this.model.dob = this.myForm.get("dob").value;
    this.model.address_number = this.myForm.get("address_number").value;
    this.model.address_street = this.myForm.get("address_street").value;
    this.model.address_city = this.myForm.get("address_city").value;
    this.model.address_postal_code = this.myForm.get("address_postal_code").value;
    this.model.email = this.myForm.get("email").value;
    this.model.phone_number = this.myForm.get("phone_number").value;
    this.model.emergency_contact_name = this.myForm.get("emergency_contact_name").value;
    this.model.emergency_relationship = this.myForm.get("emergency_relationship").value;
    this.model.emergency_contact_number = this.myForm.get("emergency_contact_number").value;
    return this.model;
  }
}
