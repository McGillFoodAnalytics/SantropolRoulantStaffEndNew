import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {FirebaseService} from '../firebase-service.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { UserTransferService } from '../user-transfer.service';

@Component({
  selector: 'app-volunteer-directory',
  templateUrl: './volunteer-directory.component.html',
  styleUrls: ['./volunteer-directory.component.scss'],
})


export class VolunteerDirectoryComponent implements OnInit {
  displayedColumns: string[] = [ 'first_name', 'last_name', 'email', 'phone_number'];
  volunteers: any = [];
  origVolunteers: any = [];
  volunteerRef: AngularFireList<any>;
  volunteersObservable: Observable<any[]>;
  expandableColumns;
  events: any = [];
  eventsObservable;
  dataSource = new MatTableDataSource();
  errorMessage;
  expandedElement: Event;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private userTransfer: UserTransferService, private fs: FirebaseService,  private db: AngularFireDatabase) {
    this.errorMessage = "";
  }


  ngOnInit() {
     //trigger the toolbar to load 
     this.userTransfer.loginUpdate(true);
     
  }
  

  ngAfterViewInit() {
        //sub.unsubscribe();
    this.fs.getUsers().subscribe(snapshots => {
      snapshots.forEach(element => {

        element.phone_number = this.prettifyPhoneNumber(element.phone_number);
          //Add new field to the list of vols that contains first and last name separated by a space, used for filtering. The field .a is important, since filter applies to fields ordered in alphabetical order
        // The normalize("NFD").replace(/[\u0300-\u036f]/g, "") uses a regex character class to ignore special characters such as accents
        element.a = element.first_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")  + " " + element.last_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ;
      });
    this.dataSource = new MatTableDataSource(snapshots);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  // let temp = Object.keys(this.volunteers[0]);
  // temp = temp.filter(e => !this.displayedColumns.includes(e));
  });
  }

  prettify(str: string) {
    let string = str.replace('_', ' ');
    return string.charAt(0). toUpperCase() + string.slice(1);
  }

  prettifyPhoneNumber(str: string){
    let a = str.charAt(0)+str.charAt(1)+str.charAt(2);
    let b = str.charAt(3)+str.charAt(4)+str.charAt(5);
    let c = str.charAt(6)+str.charAt(7)+str.charAt(8)+str.charAt(9);
    let phoneNumber = '(' + a + ') ' + b + '-' + c;
    return phoneNumber;
  }

  prettifyBirthDate(str: string){
    let str1 = str.slice(0,10);
    str1 = this.reverseDate(str1);
    return str1;
  }

  // reformat the birth date displayed
  reverseDate(str: string){
    let year = str.charAt(0)+str.charAt(1)+str.charAt(2)+str.charAt(3);
    let month = str.charAt(5)+str.charAt(6);
    let day = str.charAt(8)+str.charAt(9);
    let date = day + '-' + month + '-' + year;
    return date;
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
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.filter = filterValue.trim().replace(/[e]/g, "é");
    //this.dataSource.filter = filterValue;    
  
    this.dataSource.filter = filterValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return this.dataSource.filter;
}

  //Filter the dropdown menu
  onKey(event){

        this.volunteers = this.origVolunteers.filter(a => (a.first_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") + " "+a.last_name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")).toString().toLowerCase()
        .includes(event.toString().toLowerCase()));
        
        this.volunteers  = event
        
 }      

}
