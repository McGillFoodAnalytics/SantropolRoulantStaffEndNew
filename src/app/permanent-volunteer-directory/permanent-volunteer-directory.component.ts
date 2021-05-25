import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { sanitizeIdentifier } from '@angular/compiler';

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
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Volunteer','Event Type','Event Start Date','Event End Date'];

  private eventsObservable;
  private model: any = {};
  result: Observable<any>
  today: Date;

  constructor(private modalService: NgbModal, private fs: FirebaseService){
  }

  ngOnInit() {
    this.eventsObservable = this.fs.getPermanentEvents();
    this.eventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        snapshot.start_date = this.formatEventDate(snapshot.start_date);
        snapshot.end_date = this.formatEventDate(snapshot.end_date);
        this.events.push(snapshot);
      });
      this.dataSource = new MatTableDataSource(snapshots);

    });
  

  }
  ngAfterViewInit(){
    this.eventsObservable = this.fs.getPermanentEvents();
    this.eventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        snapshot.start_date = this.formatEventDate(snapshot.start_date);
        snapshot.end_date = this.formatEventDate(snapshot.end_date);
        this.events.push(snapshot);
      });
      this.dataSource = new MatTableDataSource(snapshots);
    });
    


  }
  formatEventType(eventType: string){
    let newId;
    switch (eventType) {
      case "kitam":
        newId = "Kitchen AM";
        break;
      case "kitpm":
        newId = "Kitchen PM";
        break;
      case "deldr":
        newId = "Delivery Driver";
        break;
      case "deliv":
        newId = "Delivery";
        break;
      default :
        newId = "Old Event Type" 
    }
    return newId;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer-directory', centered: true});
  }

  delete(eventID){
    this.fs.removePermanentVolunteer(eventID);
  }
  applyFilter(filterValue: string) {
    console.log("Filtering")
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

  }
  formatEventDate(eventDate: string) {
    // code1 is the part of the event date that contains data specific to yyyy-mm-dd
    let code1 = eventDate.substring(0, 10);
    let day = code1.substring(8,10);
    let month = code1.substring(5,7);
    let year = code1.substring(0,4);
  
    // Create Date type to extract month in string format easily
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // MonthName is the month in plain language, i.e. January
    let monthName = newDate.toLocaleString('default', { month: 'long' });
    let date =  monthName + " " + day + ", " + year;
    return date;
  }

}
