import { Component, OnInit } from '@angular/core';
import {UserTransferService} from '../user-transfer.service';

import {FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminManageUserComponent implements OnInit {

  constructor(private userTransfer : UserTransferService, public modal: NgbActiveModal, private userService: UserService) { }

  form = new FormGroup({
    uid: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    role: new FormControl(''),
  });

  user$: Observable<{}>;

  ngOnInit(): void {

    /*
    this.user$ = this.userTransfer.user.pipe(

      tap(user => {

        console.log("here");
        console.log(user);

        if (user) {
          this.form.patchValue(user);
        } else {
          this.form.reset({});
        }
      })
    );
      */

    this.userTransfer.user().subscribe(u => {
      this.form.patchValue(u);
    });

  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  save() {
    const { uid, displayName, email, role, phoneNumber} = this.form.value;
    this.modal.close({ uid, displayName, email, role, phoneNumber});
  }

  delete() {

    //indicate that form not submitted

    this.userService.delete(this.form.get("uid").value).subscribe(_ => {
      console.log('user deleted');
      this.modal.close();
    });

  }

  sendPasswordReset(){

    //indicate that form not submitted

    this.userService.passwordReset(this.form.get("uid").value).subscribe(_ => {
      console.log('reset email sent');
      this.modal.close();
    });
  }

}
