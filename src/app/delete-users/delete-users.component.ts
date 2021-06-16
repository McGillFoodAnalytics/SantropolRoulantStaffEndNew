import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseService} from '../firebase-service.service';
import { Observable } from "rxjs";

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import '@firebase/auth';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})

export class DeleteUsersComponent implements OnInit {
  private modalReference;
  private today: Date;
  private volunteers: Observable<any[]>;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private fs: FirebaseService) {
    this.today = new Date();
  }

  ngOnInit() {
    

  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }


  onSubmit(f){
    this.fs.deleteAllUsers();
    //this.deleteUser("121123123123");
    // this.deleteUser("aa5145145143");
  }
}
