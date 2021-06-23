import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from "../firebase-service.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-week',
  templateUrl: './past-week.component.html',
  styleUrls: ['./past-week.component.scss']
})
export class PastWeekComponent implements OnInit {

  today: any;
  nameInput: string;
  filterDate: any;
  prevShifts: any = [];
  tempShifts: any = [];
  displayedColumns: string[] =['Volunteer', 'Shift Type', 'Shift Date'];
  dataSource = new MatTableDataSource();
  currentShiftType;
  shiftTypes = {
    kitam: "Kitchen AM",
    kitpm: "Kitchen PM",
    deldr: "Delivery Driver",
    deliv: "Delivery",
  };
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.firebase.getPastEvents().subscribe(snapshots => {
      for (let index = snapshots.length - 1 ; index > -1 ; index--) {
        if (snapshots[index].first_name != "" && snapshots[index].last_name != "") {
           this.prevShifts.push(snapshots[index]);
        }
      }
      this.dataSource = new MatTableDataSource(this.prevShifts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.tempShifts = this.prevShifts;
    });
  }

  //Convert shift type from short to long format
  formatShiftType(shiftType: string){
    return this.shiftTypes[shiftType];  
  }

  applyShift(shiftType) {
    if(shiftType != "all"){
      this.currentShiftType = shiftType;
      this.tempShifts = this.prevShifts.filter(shift => {
        return (shift.event_type === shiftType);
      });
    } else {
      this.currentShiftType = null;
      this.tempShifts = this.prevShifts;
    }
    
    // Apply filter by date if a date is currently set
    if (this.filterDate) {
      this.tempShifts = this.tempShifts.filter(shift => {
        return (shift.event_date_txt === this.filterDate);
      });
    }
    this.dataSource.data = this.tempShifts;
    this.applyFilter();
  }

  applyFilter() {
    if (this.nameInput) {   
      this.dataSource.filter = this.nameInput.toLowerCase().trim();
    }
  }

  applyDate(date: Date){
    let newDate = this.firebase.getDateString(date);
    this.filterDate = newDate;
    this.tempShifts = this.prevShifts.filter(shift => {
      return (shift.event_date_txt === newDate);
    });
    
    // Apply shift type filter if a current type is set
    if (this.currentShiftType) {
      this.tempShifts = this.tempShifts.filter(shift => {
        return (shift.event_type === this.currentShiftType);
      });
    }
    this.dataSource.data = this.tempShifts;
    this.applyFilter();
  }
}