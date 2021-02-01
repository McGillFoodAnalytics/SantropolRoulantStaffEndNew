import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-permanent-volunteer',
  templateUrl: './permanent-volunteer.component.html',
  styleUrls: ['./permanent-volunteer.component.scss'],

})
export class PermanentVolunteerComponent implements OnInit {
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

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

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
        this.events.push(snapshot);
      });
    });

    this.addPermanentForm = this.formBuilder.group({
      frequency: ['', Validators.required],
      endDate: ['', Validators.required],
      startDate:['', Validators.required],
      volunteer:[['','',''], Validators.required],
      eventType:['', Validators.required]
    });

    this.filteredOptions = this.addPermanentForm.get('volunteer').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();

    return this.volunteers.filter(option => (option.first_name + " " + option.last_name).toLowerCase().includes(filterValue));
  }

  endDateRequiredError() {
    return (this.model.endDate == undefined || this.model.endDate == null) || (this.model.endDate < this.model.startDate);
  }

  startDateRequiredError() {
    return this.model.startDate == undefined || this.model.startDate == null;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer', centered: true});
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
