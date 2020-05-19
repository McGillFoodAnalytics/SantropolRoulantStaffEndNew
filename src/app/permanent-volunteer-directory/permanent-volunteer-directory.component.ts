import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-permanent-volunteer-directory',
  templateUrl: './permanent-volunteer-directory.component.html',
  styleUrls: ['./permanent-volunteer-directory.component.scss'],

})
export class PermanentVolunteerDirectoryComponent implements OnInit {
  active = 1;
  private modalReference;
  private volunteers: any = [];
  private volunteersObservable;
  private events: any = [];
  private eventsObservable;
  private model: any = {};
  private addPermanentForm: FormGroup;
  result: Observable<any>
  today: Date;
  aYearFromNow: Date;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private fs: FirebaseService){
    this.today = new Date();
    this.aYearFromNow = new Date();
    this.aYearFromNow.setFullYear(this.aYearFromNow.getFullYear() + 1);
  }

  ngOnInit() {
      this.volunteersObservable = this.fs.getUsers();
      this.eventsObservable = this.fs.getPermanentEvents();
      this.volunteersObservable.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.volunteers.push(snapshot);
      });
    });
    this.eventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        snapshot.start_date = new Date(snapshot.start_date).toLocaleDateString();
        snapshot.end_date = new Date(snapshot.end_date).toLocaleDateString();
        // for(let volunteer in this.volunteers){
        //   console.log(volunteer.key);
        //   console.log(snapshot.user_id);
        //   if(volunteer.key==snapshot.user_id){
        //     snapshot.user_id = volunteer.first_name + ' ' + volunteer.last_name;
        //     console.log(snapshot.user_id);
        //     break;
        //   }
        // }
        this.events.push(snapshot);
      });
    });

    this.addPermanentForm = this.formBuilder.group({
      frequency: ['', Validators.required],
      endDate: ['', Validators.required],
      startDate:['', Validators.required],
      volunteer:['', Validators.required],
      eventType:['', Validators.required]
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
      this.addPermanentForm.markAllAsTouched();
      if (this.addPermanentForm.valid) {
        this.modalReference.close();
        this.fs.addPermanentVolunteer(this.model.eventType, this.model.volunteer, this.model.startDate, this.model.endDate, this.model.frequency);
        this.addPermanentForm.reset();
        this.model = {};
      }
    }
  }
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
