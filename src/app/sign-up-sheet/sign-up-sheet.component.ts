import { Component, OnInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import "bootstrap/dist/js/bootstrap.bundle";
import { FirebaseService } from "../firebase-service.service";
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from "@angular/material/tooltip";

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 1000,
};

@Component({
  selector: "app-sign-up-sheet",
  templateUrl: "./sign-up-sheet.component.html",
  styleUrls: ["./sign-up-sheet.component.scss"],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class SignUpSheetComponent implements OnInit {
  displayedColumns: string[] = [
    "event_date_txt",
    "first_name",
    "last_name",
    "event_type",
    "actions",
  ];
  private events: Observable<any[]>;
  private volunteers: Observable<any[]>;
  public isCollapsed = true;
  private permanent_events: Observable<any[]>;
  private volunteerList = [];
  private volunteerListInitialized = false;
  private week1;
  private week2;
  private week3;
  private weekRange1: string;
  private weekRange2: string;
  private weekRange3: string;
  source;
  expandedElement: Event;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentWeek = "first";
  eventTypes = {
    "Kitchen AM": "kitam",
    "Kitchen PM": "kitpm",
    "Delivery Driver": "deldr",
    Delivery: "deliv",
  };
  eventTypesCool = {
    kitam: "Kitchen AM",
    kitpm: "Kitchen PM",
    deldr: "Delivery Driver",
    deliv: "Delivery",
  };
  eventArray = ["Kitchen AM", "Kitchen PM", "Delivery Driver", "Delivery"];

  currentEvent = "Kitchen AM";
  private pane = "left";
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private fs: FirebaseService) {}

  ngOnInit() {
    this.events = this.fs.getEvents();
    this.fs.getEvents().subscribe((snapshots) => {
      this.dataSource = new MatTableDataSource(snapshots);
      this.dataSource.sort = this.sort;
    });
    this.formatEventDates();
    this.volunteers = this.fs.getUsers();
    this.setVolunteerList();
    this.db
      .list("event")
      .auditTrail()
      .subscribe((changes) => {
        this.formatEventDates();
        this.volunteers = this.fs.getUsers();
        this.setVolunteerList();
      });
    this.removeLoading();
  }

  removeLoading() {
    var spinner = document.getElementById("spinner");
    var spinnerBackgrond = document.getElementById("loaderBackground");
    setTimeout(function () {
      spinner.style.display = "none";
      spinnerBackgrond.style.display = "none";
    }, 1400);
  }

  prettify(str: string) {
    let string = str.replace("_", " ");
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  prettifyPhoneNumber(str: string) {
    let a = str.charAt(0) + str.charAt(1) + str.charAt(2);
    let b = str.charAt(3) + str.charAt(4) + str.charAt(5);
    let c = str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9);
    let phoneNumber = "(" + a + ") " + b + "-" + c;
    return phoneNumber;
  }

  setVolunteerList() {
    this.volunteers.subscribe((snapshots) => {
      if (this.volunteerListInitialized === true) {
        this.volunteerList = [];
      }
      this.volunteerListInitialized = false;
      snapshots.forEach((snapshot) => {
        this.volunteerList.push(snapshot);
      });
    });
  }

  formatEventDates() {
    const events_per_week = 125;
    this.events.subscribe((snapshots) => {
      let i = 0;
      this.week1 = [];
      this.week2 = [];
      this.week3 = [];
      snapshots.forEach((snapshot) => {
        snapshot.event_date = this.fs.formatDate(
          snapshot.event_date.toString()
        );
        const event_type = snapshot.event_type.toString();
        const event_date = snapshot.event_date;
        if (i < events_per_week) {
          if (!(event_type in this.week1)) {
            this.week1[event_type] = {};
          }
          if (!(event_date in this.week1[event_type])) {
            this.week1[event_type][event_date] = {
              slots: [],
              num_volunteers: 0,
              num_slots: 0,
              is_important_event: snapshot.is_important_event,
              display_date: this.getDisplayDate(event_date),
            };
          }
          if (snapshot.first_name) {
            this.week1[event_type][event_date]["num_volunteers"] =
              this.week1[event_type][event_date]["num_volunteers"] + 1;
          }
          this.week1[event_type][event_date]["num_slots"] =
            this.week1[event_type][event_date]["num_slots"] + 1;
          this.week1[event_type][event_date]["slots"].push(snapshot);
        } else if (i >= events_per_week && i < 2 * events_per_week) {
          if (!(event_type in this.week2)) {
            this.week2[event_type] = {};
          }
          if (!(event_date in this.week2[event_type])) {
            this.week2[event_type][event_date] = {
              slots: [],
              num_volunteers: 0,
              num_slots: 0,
              is_important_event: snapshot.is_important_event,
              display_date: this.getDisplayDate(event_date),
            };
          }
          if (snapshot.first_name) {
            this.week2[event_type][event_date]["num_volunteers"] =
              this.week2[event_type][event_date]["num_volunteers"] + 1;
          }
          this.week2[event_type][event_date]["num_slots"] =
            this.week2[event_type][event_date]["num_slots"] + 1;
          this.week2[event_type][event_date]["slots"].push(snapshot);
        } else if (i >= 2 * events_per_week && i < 3 * events_per_week) {
          if (!(event_type in this.week3)) {
            this.week3[event_type] = {};
          }
          if (!(event_date in this.week3[event_type])) {
            this.week3[event_type][event_date] = {
              slots: [],
              num_volunteers: 0,
              num_slots: 0,
              is_important_event: snapshot.is_important_event,
              display_date: this.getDisplayDate(event_date),
            };
          }
          if (snapshot.first_name) {
            this.week3[event_type][event_date]["num_volunteers"] =
              this.week3[event_type][event_date]["num_volunteers"] + 1;
          }
          this.week3[event_type][event_date]["num_slots"] =
            this.week3[event_type][event_date]["num_slots"] + 1;
          this.week3[event_type][event_date]["slots"].push(snapshot);
        }
        i = i + 1;
      });
      this.weekRange1 = this.setWeekRange(this.week1);
      this.weekRange2 = this.setWeekRange(this.week2);
      this.weekRange3 = this.setWeekRange(this.week3);
    });
  }

  isPermanentEvent(slot) {
    return "permanent_event_id" in slot;
  }
  getDisplayDate(date: string) {
    return new Date(date);
  }

  nextWeek() {
    this.currentWeek = this.currentWeek === "first" ? "second" : "third";
  }

  prevWeek() {
    this.currentWeek = this.currentWeek === "third" ? "second" : "first";
  }

  getWeekTitle() {
    this.weekRange1 = this.setWeekRange(this.week1);
    this.weekRange2 = this.setWeekRange(this.week2);
    this.weekRange3 = this.setWeekRange(this.week3);

    if (this.currentWeek == "first") {
      return this.weekRange1;
    } else if (this.currentWeek == "second") {
      return this.weekRange2;
    } else {
      return this.weekRange3;
    }
  }

  setWeekRange(week) {
    if (week) {
      var week_title = "";
      const event = Object.keys(week)[0];
      const monday = new Date(Object.keys(week[event])[0]);
      const monday_month = monday.toLocaleString("default", { month: "long" });
      const monday_date = monday.getDate();
      const monday_year = monday.getFullYear();
      var saturday = new Date(monday.getTime() + 5 * 86400000);
      const saturday_month = saturday.toLocaleString("default", {
        month: "long",
      });
      const saturday_date = saturday.getDate();
      const saturday_year = saturday.getFullYear();
      if (monday_month != saturday_month) {
        if (monday_year != saturday_year) {
          week_title =
            monday_month +
            " " +
            monday_date +
            ", " +
            monday_year +
            " - " +
            saturday_month +
            " " +
            saturday_date +
            ", " +
            saturday_year;
        } else {
          week_title =
            monday_month +
            " " +
            monday_date +
            " - " +
            saturday_month +
            " " +
            saturday_date +
            ", " +
            monday_year;
        }
      } else {
        week_title =
          monday_month +
          " " +
          monday_date +
          " - " +
          saturday_date +
          ", " +
          monday_year;
      }
      return week_title;
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLastDate(week) {
    const event = Object.keys(week)[0];
    const monday = new Date(Object.keys(week[event])[0]);
    const monday_month = monday.toLocaleString("default", { month: "long" });
    const monday_date = monday.getDate();
    const monday_year = monday.getFullYear();
    var saturday = new Date(monday.getTime() + 5 * 86400000);
    return saturday;
  }

  getEventList() {
    var currentEventValue = this.eventTypes[this.currentEvent];
    if (this.currentWeek == "first") {
      return this.week1[currentEventValue];
    } else if (this.currentWeek == "second") {
      return this.week2[currentEventValue];
    } else {
      return this.week3[currentEventValue];
    }
  }

  getEventName(eventType) {
    return this.eventTypesCool[eventType];
  }

  getEventListCool(eventType) {
    var currentEventValue = this.eventTypes[eventType];
    if (this.currentWeek == "first") {
      let week1 = Object.keys(this.week1[currentEventValue]);
      if (week1.length == 5) {
        this.addEmptyThursday(this.week1[currentEventValue]);
      }
      return this.week1[currentEventValue];
    } else if (this.currentWeek == "second") {
      let week2 = Object.keys(this.week2[currentEventValue]);
      if (week2.length == 5) {
        this.addEmptyThursday(this.week2[currentEventValue]);
      }
      return this.week2[currentEventValue];
    } else {
      let week3 = Object.keys(this.week3[currentEventValue]);
      if (week3.length == 5) {
        this.addEmptyThursday(this.week3[currentEventValue]);
      }
      return this.week3[currentEventValue];
    }
  }

  addEmptyThursday(obj) {
    const monday = new Date(Object.keys(obj)[0]);
    const mond = monday.getMonth();
    const thursday = new Date(monday.getTime() + 3 * 86400000);

    const day =
      thursday.getDate() < 10 ? "0" + thursday.getDate() : thursday.getDate();

    const month =
      thursday.getMonth() < 10
        ? "0" + (thursday.getMonth() + 1)
        : thursday.getMonth() + 1;

    // console.log(month);
    const year = thursday.getFullYear();
    const date = month + "/" + day + "/" + year;

    obj[date] = {
      slots: [
        {
          id: "N/A",
          event_date: date,
          event_time_end: "N/A",
          event_time_start: "N/A",
        },
      ],
      num_volunteers: 0,
      num_slots: 0,
      is_important_event: false,
      display_date: this.getDisplayDate(date),
    };
    //console.log(obj);
  }

  changeEventImportance(day: string) {
    var slots;
    var is_important_event;
    var currentEventValue = this.eventTypes[this.currentEvent];
    if (this.currentWeek == "first") {
      is_important_event =
        !this.week1[currentEventValue][day]["is_important_event"];
      this.week1[currentEventValue][day]["is_important_event"] =
        is_important_event;
      slots = this.week1[currentEventValue][day]["slots"];
    } else if (this.currentWeek == "second") {
      is_important_event =
        this.week2[currentEventValue][day]["is_important_event"];
      this.week2[currentEventValue][day]["is_important_event"] =
        !is_important_event;
      slots = this.week2[currentEventValue][day]["slots"];
    } else {
      is_important_event =
        this.week3[currentEventValue][day]["is_important_event"];
      this.week3[currentEventValue][day]["is_important_event"] =
        !is_important_event;
      slots = this.week3[currentEventValue][day]["slots"];
    }
    for (var slot of slots) {
      this.fs.changeEventImportance(slot["id"], is_important_event);
    }
  }

  // Used for new format of week-shift display
  changeEventImportanceCool(day: string, eventType: string) {
    var slots;
    var is_important_event;
    var currentEventValue = this.eventTypes[eventType];
    //console.log(currentEventValue + "    sssss");

    if (this.currentWeek == "first") {
      is_important_event =
        !this.week1[currentEventValue][day]["is_important_event"];
      this.week1[currentEventValue][day]["is_important_event"] =
        is_important_event;
      slots = this.week1[currentEventValue][day]["slots"];
    } else if (this.currentWeek == "second") {
      is_important_event =
        !this.week2[currentEventValue][day]["is_important_event"];
      this.week2[currentEventValue][day]["is_important_event"] =
        is_important_event;
      slots = this.week2[currentEventValue][day]["slots"];
    } else {
      is_important_event =
        !this.week3[currentEventValue][day]["is_important_event"];
      this.week3[currentEventValue][day]["is_important_event"] =
        is_important_event;
      slots = this.week3[currentEventValue][day]["slots"];
    }
    for (var slot of slots) {
      this.fs.changeEventImportance(slot["id"], is_important_event);
    }
  }

  getVolunteerList() {
    return this.volunteerList;
  }

  getSignUpData() {
    return [
      { slot: 0, volunteer: "alexa" },
      { slot: 1, volunteer: "alexa" },
      { slot: 2, volunteer: "alexa" },
    ];
  }

  removeUserFromEvent(event_id) {
    this.fs.removeUserFromEvent(event_id);
  }

  addUserToEvent(user, event_info) {
    var event_id = event_info.slots[event_info.num_volunteers].id;
    this.fs.addUserToEvent(event_id, user.first_name, user.last_name, user.key);
  }

  // permanentVolunteerEvent(event, event_id, user_id, event_date, first_name, last_name, slot) {
  //   if ( event.event == "remove" ) {
  //     const data = event.removePermanentVolunteerData;
  //     const event_type =  this.eventTypes[data.eventType];
  //     const freq = slot.permanent_event_id.slice(-1);
  //     const associatedPermanentEvents = this.getAssociatedPermanentEvents(event_date, freq, this.eventTypes[data.eventType], true);
  //     this.fs.removePermanentVolunteer(
  //       slot.permanent_event_id
  //     )
  //     for(let i = 0; i < associatedPermanentEvents.length; i++) {
  //       this.fs.removePermanentVolunteerEvents(associatedPermanentEvents[i]);
  //     }
  //   }
  //   if ( event.event == "add" ) {
  //     const data = event.addPermanentVolunteerData;
  //     const event_type =  this.eventTypes[data.eventType];
  //     const associatedPermanentEvents = this.getAssociatedPermanentEvents(event_date, data.frequency, event_type, false);
  //     this.fs.addPermanentVolunteer(
  //       event_type,
  //       user_id,
  //       data.weekday,
  //       event_date,
  //       data.endDate,
  //       data.frequency,
  //       event_id
  //     );
  //     this.fs.addPermanentVolunteerEvents(
  //       associatedPermanentEvents,
  //       user_id,
  //       first_name,
  //       last_name,
  //       this.eventTypes[data.eventType] + '_' + data.weekday + '_' + user_id + '_' + data.frequency
  //     )
  //   }
  // }

  getAssociatedPermanentEvents(startDate, frequency, event_type, remove): any {
    const associatedPermanentEvents = [];
    const lastDate = this.getLastDate(this.week3);
    let currentDate = startDate;
    while (currentDate.getTime() <= lastDate.getTime()) {
      const year = currentDate.getFullYear().toString();
      let month = currentDate.getMonth() + 1;
      month = month < 9 ? "0" + month.toString() : month.toString();
      let day = currentDate.getDate();
      day = day < 9 ? "0" + day.toString() : day.toString();
      const event_date = month + "/" + day + "/" + year;
      let slot_num;
      if (event_date in this.week1[event_type]) {
        slot_num = this.week1[event_type][event_date].num_volunteers;
      } else if (event_date in this.week2[event_type]) {
        slot_num = this.week2[event_type][event_date].num_volunteers;
      } else {
        slot_num = this.week3[event_type][event_date].num_volunteers;
      }
      slot_num =
        currentDate.getTime() === startDate.getTime() || remove
          ? slot_num
          : slot_num + 1;
      slot_num = slot_num < 9 ? "0" + slot_num.toString() : slot_num.toString();
      const event_id = year.slice(-2) + month + day + event_type + slot_num;
      associatedPermanentEvents.push(event_id);
      currentDate = new Date(currentDate.getTime() + 1000 * 604800 * frequency);
    }
    console.log("associatedper");
    console.log(associatedPermanentEvents);
    return associatedPermanentEvents;
  }

  insertStaffNote(event) {
    this.fs.addStaffNoteToEvent(event.event_id, event.staff_note);
  }

  updateEventNote(event_id, event_note) {
    console.log("update event");
    this.fs.updateEventNote(event_id, event_note);
  }
}
