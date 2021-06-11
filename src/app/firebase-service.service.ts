import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  volunteerRef: AngularFireList<any>;
  volunteers: Observable<any[]>;
  permanentEventsRef: AngularFireList<any>;
  permanentEvents: Observable<any[]>;
  eventRef: AngularFireList<any>;
  events: Observable<any[]>;
  pastEventRef: AngularFireList<any>;
  pastEvents: Observable<any[]>;
  cancelledEvents: Observable<any[]>;
  eventDates = {};
  volunteerSampleRef: AngularFireList<any>;
  volunteerSamples: Observable<any[]>;
  shiftsNotAdded : any = [];
  eventChanges: Observable<any[]>;
  bugsRef: AngularFireList<any>;
  bugs: Observable<any[]>;
  user: Observable<any>;

  shiftTypeLength = {
    kitam: 5,
    kitpm: 5,
    deldr: 4,
    deliv: 10,
  };

  constructor(private db: AngularFireDatabase) {}

  getUserSamples(): Observable<any[]> {
    this.volunteerSampleRef = this.db.list("userSample");
    this.volunteerSamples = this.volunteerSampleRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.volunteerSamples;
  }

  getUsers(): Observable<any[]> {
    this.volunteerRef = this.db.list("user");
    this.volunteers = this.volunteerRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.volunteers;
  }

  getUser(userId): Observable<any> {
    return this.db.object("user/" + userId).valueChanges();
  }

  getPermanentEvents(): Observable<any[]> {
    this.permanentEventsRef = this.db.list("recurring_events");
    this.permanentEvents = this.permanentEventsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.permanentEvents;
  }

  getEvents(): Observable<any[]> {
    this.eventRef = this.db.list("event");
    this.events = this.eventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.events;
  }

  getPastEvents(): Observable<any[]> {
    this.pastEventRef = this.db.list("past_events");
    this.pastEvents = this.pastEventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.pastEvents;
  }

  getEventsJson(): {} {
    this.events = this.getEvents();
    this.events.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        let event_date = snapshot.event_date.toString();
        const event_type = snapshot.event_type.toString();
        event_date = this.formatDate(event_date);
        if (!(event_date in this.eventDates)) {
          this.eventDates[event_date] = {};
          this.eventDates[event_date][event_type] = [snapshot.id];
        } else {
          if (!(event_type in this.eventDates[event_date])) {
            this.eventDates[event_date][event_type] = [snapshot.id];
          } else {
            this.eventDates[event_date][event_type].push(snapshot.id);
          }
        }
      });
    });
    return this.eventDates;
  }

  formatDate(date: string) {
    const year = "20" + date.substring(0, 2);
    const month = date.substring(2, 4);
    const day = date.substring(4, 6);
    date = month + "/" + day + "/" + year;
    return date;
  }

  changeEventImportance(event_id: string, is_important_event: boolean) {
    this.db.object("/event/" + event_id).update({
      is_important_event: is_important_event,
    });
  }

  removeUserFromEvent(event_id: string) {
    this.updateCancellations(event_id);
    this.db.object("/event/" + event_id).update({
      first_name: "",
      last_name: "",
      uid: "nan",
      staff_note: "",
      note: "",
      first_shift: false,
    });
  }

  updateCancellations(event_id: string): void {
    var userId;
    var count;
    this.eventRef = this.db.list("event");
    this.events = this.eventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    this.events.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.id == event_id) {
          //console.log(snapshot);
          userId = snapshot.uid;
        }
      });
    });

    this.volunteerRef = this.db.list("user");
    this.volunteers = this.volunteerRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );

    this.volunteers.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.id == userId) {
          count = snapshot.cancellations;
          if (isNaN(count)) {
            count = 0;
          }
          count++;
          this.db.object("/user/" + userId).update({
            cancellations: count,
          });
        }
      });
    });
  }

  addCancellation(eventId: string, uid: string, reason: string) {
    if (reason == "" || reason == null) {
      this.db.object("cancellation/" + eventId + "_" + uid).update({
        event_id: eventId,
        user_id: uid,
      });
    } else {
      this.db.object("cancellation/" + eventId + "_" + uid).update({
        event_id: eventId,
        user_id: uid,
        reason: reason,
      });
    }
  }

  addUserToEvent( event_id: string, first_name: string, last_name: string,
  uid: string, note: string): void {
    this.db.object("/event/" + event_id).update({
      first_name: first_name,
      last_name: last_name,
      uid: uid,
      staff_note: note
    });
  }

  addNewBug(description) {
    var a;
    this.bugsRef = this.db.list("bug");
    this.bugs = this.bugsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    this.bugs.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        if (snapshot.id == "count") {
          console.log(snapshot);
          a = snapshot.number;
          console.log(a);
          a++;
          this.db.object("/bug/count").update({
            number: a,
          });
          this.db.object("/bug/" + a).update({
            description: description,
          });
        }
      });
    });
  }

  async addPermanentVolunteer( event_type: string, user_id, start_date: Date, end_date: Date, frequency: Number, note: string ) : Promise<any[]> {

    this.shiftsNotAdded = [];
    const permanent_event_id = event_type + "_" + start_date.getDate() +
      frequency + end_date.getMonth() +  "_" + user_id[0];

    this.db.object("/recurring_events/" + permanent_event_id).update({
      event_type: event_type,
      user_id: user_id[0],
      first_name: user_id[1],
      last_name: user_id[2],
      start_date: start_date,
      end_date: end_date,
      frequency: frequency,
    });

    let shiftCode;
    let validDates = this.getDates(new Date(start_date), new Date(end_date), frequency);
    for (let i = 0; i < validDates.length; i++) {
      let flag = false;
      for (let j = 0; j < this.shiftTypeLength[event_type]; j++) {
        var a = this.db
          .object("event/" + validDates[i] + event_type + this.pad(j + 1, 2))
          .valueChanges()
          .subscribe((news: any) => {
            if (news.uid == user_id[0]) {
              flag = true;
            } 
            else if (flag == false && news.uid == "nan") {
              flag = true;
              // console.log("in here:" + validDates[i] + event_type + this.pad(j + 1, 2) + " " + flag);
              this.addUserToEvent(
                validDates[i] + event_type + this.pad(j + 1, 2),
                user_id[1],
                user_id[2],
                user_id[0],
                note
              );
            } 
            else if (!flag && j == this.shiftTypeLength[event_type] - 1) {
              shiftCode = news.event_type + news.event_date;
              this.shiftsNotAdded.push(shiftCode);
            }
          });
        await this.delay(500);
      }
    }
    return this.shiftsNotAdded;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getDates(firstDate, lastDate, freq) {
    let validDates = [];
    //console.log("First date: " + firstDate.toString() + ", Last date: " + lastDate.toString());
    while (firstDate <= lastDate) {
      //push the first Date
      validDates.push(this.getDateNumber(firstDate));
      //console.log(firstDate);
      //console.log(freq);
      let incrementInMilliseconds = freq * 7 * 24 * 60 * 60 * 1000;
      firstDate.setTime(firstDate.getTime() + incrementInMilliseconds);
      //console.log(firstDate);
    }
    return validDates;
  }
  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  getDateString(dateval) {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dayName = days[dateval.getDay()];
    var monthName = months[dateval.getMonth()];
    var dateString =
      dayName +
      ", " +
      monthName +
      " " +
      dateval.getDate() +
      ", " +
      dateval.getFullYear();
    return dateString;
  }

  getDateNumber(date) {
    let month = "";
    let day = "";
    if (date.getMonth() + 1 < 10) {
      month = "0" + (date.getMonth() + 1).toString();
    } else {
      month = (date.getMonth() + 1).toString();
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate().toString();
    } else {
      day = date.getDate().toString();
    }
    let dateString =
      date.getFullYear().toString().substring(2, 4) + month + day;
    let intDate = +dateString;
    return intDate;
  }

  addPermanentVolunteerEvents(
    associatedPermanentEvents: [],
    user_id: string,
    first_name: string,
    last_name: string,
    permanent_event_id: string
  ) {
    for (let i = 0; i < associatedPermanentEvents.length; i++) {
      this.db.object("/event/" + associatedPermanentEvents[i]).update({
        first_name: first_name,
        last_name: last_name,
        uid: user_id,
        permanent_event_id: permanent_event_id,
      });
    }
  }

  removePermanentVolunteer(permanent_event_id) {
    this.db.object("/permanent_events/" + permanent_event_id).remove();
  }

  removePermanentVolunteerEvents(event_id) {
    console.log(event_id);

    console.log(
      this.db.object("/event/" + event_id + "/permanent_event_id").remove()
    );
  }

  addStaffNoteToEvent(event_id: string, staff_note: string): void {
    this.db.object("/event/" + event_id).update({
      staff_note: staff_note,
    });
  }

  updateEventNote(event_id: string, event_note: string): void {
    this.db.object("/event/" + event_id).update({
      event_note: event_note,
    });
  }

  getCancelledEvents(): Observable<any[]> {
    this.eventRef = this.db.list("cancellation");
    this.cancelledEvents = this.eventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.cancelledEvents;
  }

  changeActiveStatus(userid: string, isActive: boolean) {
    this.db.object("/user/" + userid).update({
      active_status: isActive,
    });
  }

  updateUserNote(userid: string, newNote: string) {
    console.log(newNote);
    this.db.object("/user/" + userid).update({
      note: newNote,
    });
  }

  // Delete a user with its user Id
  deleteUser(userid: string) {
    console.log(userid);
    this.db.object("/user/" + userid).remove();
  }
}
