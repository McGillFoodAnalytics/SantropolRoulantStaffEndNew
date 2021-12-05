import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-week-generator',
  templateUrl: './week-generator.component.html',
  styleUrls: ['./week-generator.component.css']
})
export class WeekGeneratorComponent implements OnInit {

  active = 1;
  private modalReference;
  private volunteers: any = [];
  private volunteersObservable;
  private events: any = [];
  private eventsObservable;
  private model: any = {kitamSlots: [], kitpmSlots:[], delivSlots:[],deliv_bikerSlots:[], deldrSlots:[], deldr_SRSlots:[]};
  private addPermanentForm: FormGroup;
  result: Observable<any>
  today: Date;
  aYearFromNow: Date;
  threeMondays: any = [];
  nearestMonday:Date = new Date();
  types = ['deldr', 'deldr_SR', 'deliv','deliv_biker', 'kitam', 'kitpm'];
  slotAmount = [2, 2, 12, 12, 6, 6];
  startTimes = ['14:45', '14:45', '14:45','14:45', '9:30','13:30'];
  endTimes = ['18:00', '18:00','18:00','18:00','12:30','16:00'];

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private fs: FirebaseService, private db: AngularFireDatabase){
    this.today = new Date();
    this.aYearFromNow = new Date();
    this.aYearFromNow.setFullYear(this.aYearFromNow.getFullYear() + 1);
  }

  ngOnInit() {
    this.nearestMonday = this.getMonday(new Date());
    for(let a = 0; a < 3; a++){ //next 3 weeks to choose from
      this.threeMondays.push(this.nearestMonday);
      let incrementInMilliseconds = 7* 24 * 60 * 60 * 1000;
      this.nearestMonday.setTime(this.nearestMonday.getTime() + incrementInMilliseconds);
      console.log(this.threeMondays);
      console.log(a);
    }
    this.addPermanentForm = this.formBuilder.group({
      startDate:['', Validators.required],
      kitamSlots:[[6,6,6,0,6,6,0], Validators.required],
      kitpmSlots:[[4,4,4,4,4,4,0], Validators.required],
      delivSlots:[[12,12,12,12,12,12,0], Validators.required],
      deliv_bikerSlots:[[12,12,12,12,12,12,0], Validators.required],
      deldrSlots:[[4,4,4,4,4,4,0], Validators.required],
      deldr_SRSlots:[[4,4,4,4,4,4,0], Validators.required],
    });
  }

  endDateRequiredError() {
    return (this.model.endDate == undefined || this.model.endDate == null) || (this.model.endDate < this.model.startDate);
  }

  startDateRequiredError() {
    return this.model.startDate == undefined || this.model.startDate == null;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer-directory', centered: true});
  }

  delete(eventID){
    this.fs.removePermanentVolunteer(eventID);
  }

  onSubmit(event) {
    if (event == "remove") {

      this.modalReference.close();
    }
    if (event == "add") {
    //   this.addPermanentForm.markAllAsTouched();
    //   if (this.addPermanentForm.valid) {
    //     this.modalReference.close();
    //
    //
    //       for (let weekdayNo = 0; weekdayNo < 6; weekdayNo++){ //for each weekday
    //               if (weekdayNo == 3) {//thursday
    //                       let incrementInMilliseconds = weekdayNo * 24 * 60 * 60 * 1000;
    //                       let date2 = new Date(date.toDateString());
    //                       date2.setTime(date.getTime() + incrementInMilliseconds);
    //                       let dateNumber = getDateNumber(date2);
    //                       let dateString = getDateString(date2);
    //                       for (let j = 0; j < 4; j++){ //for each slot
    //                               console.log(dateNumber + 'kitpm' + pad(j+1, 2));
    //                               var eventNameRef = this.db.object('/event/'+ dateNumber + 'kitpm' + pad(j+1, 2));
    //                               eventNameRef.update({
    //                                 event_date: dateNumber,
    //                                 event_date_txt: dateString,
    //                                 event_time_end: this.endTimes[3],
    //                                 event_time_start: this.startTimes[3],
    //                                 event_type: 'kitpm',
    //                                 first_name: '',
    //                                 first_shift: false,
    //                                 is_current: true,
    //                                 is_important_event: false,
    //                                 key: 'nan',
    //                                 last_name: '',
    //                                 note: '',
    //                                 slot: pad(j+1,2),
    //                                 uid: 'nan'
    //                               })
    //                       }
    //               }
    //
    //                else {
    //                       for (let i = 0; i < types.length; i++){ //for each type
    //                               let incrementInMilliseconds = weekdayNo * 24 * 60 * 60 * 1000;
    //                               let date2 = new Date(date.toDateString());
    //                               date2.setTime(date.getTime() + incrementInMilliseconds);
    //                               let dateNumber = getDateNumber(date2);
    //                               let dateString = getDateString(date2);
    //                               for (let j = 0; j < slotAmount[i]; j++){ //for each slot
    //                                       console.log(dateNumber + types[i] + pad(j+1, 2));
    //                                       var eventNameRef = this.db.object('/event/'+ dateNumber + types[i] + pad(j+1, 2));
    //                                       eventNameRef.set({
    //                                         event_date: dateNumber,
    //                                         event_date_txt: dateString,
    //                                         event_time_end: endTimes[i],
    //                                         event_time_start: startTimes[i],
    //                                         event_type: types[i],
    //                                         first_name: '',
    //                                         first_shift: false,
    //                                         is_current: true,
    //                                         is_important_event: false,
    //                                         key: 'nan',
    //                                         last_name: '',
    //                                         note: '',
    //                                         slot: pad(j+1,2),
    //                                         uid: 'nan'
    //                                       })
    //                               }
    //                       }
    //               }
    //       }
    //     this.addPermanentForm.reset();
    //     this.model = {};
    //   }
    // }
  }

}

getMonday(d):Date {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
// getDates(firstDate : Date, lastDate: Date, freq: number){
//   let validDates: number[] =  [];
//   //console.log("First date: " + firstDate.toString() + ", Last date: " + lastDate.toString());
//     while (firstDate <= lastDate) {
//         //push the first Date
//         validDates.push(getDateNumber(firstDate));
//         //console.log(firstDate);
//         //console.log(freq);
//         let incrementInMilliseconds = (freq)*7* 24 * 60 * 60 * 1000;
//         firstDate.setTime(firstDate.getTime() + incrementInMilliseconds);
//         //console.log(firstDate);
//     }
//
//     if(firstDate.toDateString() == 'yhi'){
//       printStrings(new Date());
//     }
//     //console.log(validDates);
//     return validDates;
// }
//
//
//
// pad(num:number, size:number) {
//     let s = num+"";
//     while (s.length < size) s = "0" + s;
//     return s;
// }
//
//
//
// getDateString(dateval: Date) {
//         var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         var months = ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'];
//         var dayName = days[dateval.getDay()];
//         var monthName = months[dateval.getMonth()];
//         var dateString = dayName + ", " + monthName + " " + dateval.getDate() + ", " + dateval.getFullYear();
//         return dateString;
//     }
//
// getDateNumber(date:Date){
//   let month = "";
//   let day = "";
//   if (date.getMonth()+1 < 10) {
//       month = "0" + (date.getMonth()+1).toString();
//   } else {
//       month = (date.getMonth()+1).toString();
//   }
//   if (date.getDate() < 10) {
//       day = "0" + date.getDate().toString();
//   } else {
//       day = date.getDate().toString();
//   }
//     let dateString = (date.getFullYear().toString()).substring(2, 4) + month + day;
//     let intDate = +dateString;
//     return intDate;
// }
  // onSubmit(){
  //   this.myForm.markAllAsTouched();
  //   if (this.myForm.valid) {
  //     this.registration_code = this.model.registration_code;
  //     this.updateRegistrationCode();
  //     this.modalReference.close();
  //     this.myForm.reset();
  //     this.model = {};
  //   }
  // }

}
