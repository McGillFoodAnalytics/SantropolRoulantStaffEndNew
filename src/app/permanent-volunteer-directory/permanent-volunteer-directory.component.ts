import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { sanitizeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-permanent-volunteer-directory',
  templateUrl: './permanent-volunteer-directory.component.html',
  styleUrls: ['./permanent-volunteer-directory.component.scss'],

})
export class PermanentVolunteerDirectoryComponent implements OnInit {

  private modalReference;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] =[
    'Volunteer',
    'Shift Type', 
    'Frequency',
    'Shift Start Date',
    'Shift End Date'
  ];

  shiftTypes = {
    kitam: "Kitchen AM",
    kitpm: "Kitchen PM",
    deldr: "Delivery Driver",
    deliv: "Delivery",
  };

  private eventsObservable;
  private model: any = {};
  result: Observable<any>
  today: Date;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal, private fs: FirebaseService){
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.eventsObservable = this.fs.getPermanentEvents();
    this.eventsObservable.subscribe(snapshots => {
      let temp : any;

      // Date 7 days ago from today's date
      var pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Sort the entries of perm volunteers by end date from recent to future.
      for(let i = 0; i < snapshots.length; i++){
        for (let j = 0; j < snapshots.length; j++) {
          if(snapshots[i].end_date < snapshots[j].end_date){
            temp = snapshots[i];
            snapshots[i] = snapshots[j];
            snapshots[j] = temp;
          }
        }
      }
    
      // Array is now sorted.
      // Remove first element while it is less than one weeek ago from today's date.
      // pastDate = 7 days ago from today
      while(snapshots[0].end_date < pastDate){
        snapshots.shift();
      }

      this.dataSource = new MatTableDataSource(snapshots);
    });
  }

  //Convert shift type from short to long format
  formatShiftType(shiftType: string){
    return this.shiftTypes[shiftType];  
  }

  /**
   * 
   * @param frequency : field of a Permanent/recurring shift for a perm vol
   * @returns the string form of frequency
   */
  formatFrequency(frequency: Number){
    switch(frequency){
      case 1: return "Weekly";
      case 2: return "Biweekly";
      case 3: return "Triweekly";
      case 4: return "Monthly";
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer-directory', centered: true});
  }

  //Not currently being used but can be added as a button 
  delete(eventID){
    this.fs.removePermanentVolunteer(eventID);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatShiftDate(eventDate: string) {
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
