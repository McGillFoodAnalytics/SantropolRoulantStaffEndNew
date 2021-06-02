import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  @ViewChild('adminModal') adminModal: any;
  closeResult: string;
  dataSource: any;

  snap: Observable<any[]>;
  l: AngularFireList<any>;

  displayedColumns: string[] = [ 'first_name', 'last_name', 'email'];

  private addAccountForm: FormGroup;

  constructor(private modal: NgbModal, private formBuilder: FormBuilder, private db: AngularFireDatabase) { }

  ngOnInit(): void {

    this.addAccountForm = this.formBuilder.group({
      privileges: ['', Validators.required],
    });

  }

  ngAfterViewInit() {

    /*
    this.db.object("/staff/").valueChanges().subscribe((users) => {

      console.log(users);

      this.dataSource = new MatTableDataSource(Object.keys(users));
      //this.dataSource.sort = this.sort;
    });
    */

    this.l = this.db.list("staff");

    this.snap = this.l.snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );

    this.snap.subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      console.log(this.dataSource);
    });
      
  }

  open() {
    // and use the reference from the component itself
    this.modal.open(this.adminModal, {size: 'sm', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        console.log(reason);
    });
  }

}
