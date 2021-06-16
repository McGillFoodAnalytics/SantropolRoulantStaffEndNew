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

  prevShifts: any = [];
  displayedColumns: string[] =['Volunteer', 'Shift Type', 'Shift Date'];
  dataSource = new MatTableDataSource();
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
    this.firebase.getPastEvents().subscribe(snapshots => {
      for (let index = 0; index < snapshots.length; index++) {
        if (snapshots[index].first_name != "" && snapshots[index].last_name != "") {
           this.prevShifts.push(snapshots[index]);
        }
      }
      this.dataSource = new MatTableDataSource(this.prevShifts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  });
  }

  //Convert shift type from short to long format
  formatShiftType(shiftType: string){
    return this.shiftTypes[shiftType];  
  }

  // Method is applied to event_date_txt field. Not used at the moment
  // This field has format example: "Monday, April 1, 2020"
  // So we check each index if it is a comma and return the substring two characters    after the first comma  
  formatShiftDate(date: string){
    let flag: boolean;
    for (let index = 0; index < date.length; index++) {
      if (date.charAt(index) == ',') {
        return date.substring(index + 2);
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
