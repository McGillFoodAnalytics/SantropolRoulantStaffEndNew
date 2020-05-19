import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {FirebaseService} from '../firebase-service.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-volunteer-directory',
  templateUrl: './volunteer-directory.component.html',
  styleUrls: ['./volunteer-directory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VolunteerDirectoryComponent implements OnInit {
  displayedColumns: string[] = [ 'first_name', 'last_name', 'email', 'phone_number'];
  volunteers: any = [];
  volunteerRef: AngularFireList<any>;
  volunteersObservable: Observable<any[]>;
  expandableColumns;
  events: any = [];
  eventsObservable;
  dataSource;
  errorMessage;
  expandedElement: User;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private fs: FirebaseService,  private db: AngularFireDatabase) {
    this.errorMessage = "";
  }

  ngOnInit() {
      this.fs.getUsers().subscribe(snapshots => {

      //console.log(this.volunteers);
      this.dataSource = new MatTableDataSource(snapshots);
      this.dataSource.sort = this.sort;
    // let temp = Object.keys(this.volunteers[0]);
    // temp = temp.filter(e => !this.displayedColumns.includes(e));
    });
  }

  prettify(str: string) {
    return str.replace('_', ' ');
  }

  capitalize(str: string) {
    return str.toUpperCase();
  }

  updateNoShow(userId, noshowcount): void {
    if(noshowcount !== -1){

    this.db.object('/user/' + userId)
      .update({
        no_show: noshowcount,
       });
       this.errorMessage="";
    } else {
      console.log("Tried to decrease the no show count below 0!");
      this.errorMessage="Can't decrease the no show count below zero!";
    }
  }

  title(str: string) {
    return str.toUpperCase();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
