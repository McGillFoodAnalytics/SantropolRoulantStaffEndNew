import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthService } from '../service/auth.service';
import {FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import { UserService } from '../user.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  closeResult: string;

  user: any;

  staff: any;
  originalCopy;

  infoSubscription;

  editFirstName = false;
  editLastName = false;
  editEmail = false;
  editPassword = false;

  email = "";
  password = "";

  loginModalRef;

  constructor(private m: NgbActiveModal, private modal: NgbModal, private db: AngularFireDatabase, public authService: AuthService, private userService: UserService) { }

  form = new FormGroup({
    uid: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });

  dismiss(){
    this.m.dismiss();
  }

  ngOnInit(): void {

    this.authService.currentAuthStatus.subscribe((authStatus) => {
      this.user = authStatus;

      if (this.user){
        this.userService.user$(this.user.uid).subscribe((val) => { this.form.patchValue(val); });
      }

    });
  }

  loginMessage(){

    this.loginModalRef = this.modal.open(LoginPopupComponent, {size: 'md', centered: true}).result.then((result) => {
        this.save();
    }, (reason) => {
        console.log(reason);
    });

  }

  save(){

    const { uid, phoneNumber, email, displayName, role, password, passwordConfirm} = this.form.value;

    this.userService.edit({uid, displayName, email, role, phoneNumber}).subscribe(_ => {
      console.log('user updated');
      this.dismiss();
    });

    if (password == passwordConfirm && password){
      this.user.updatePassword(password).then(function() {
        console.log('password updated')
      }).catch(function(error) {

        if (error.message == "auth/requires-recent-login"){
          this.loginMessage();
        }
        else{
          alert(error)
        }
      });
    }
    else if (password != passwordConfirm){
      alert("Password fields don't match.")
    };

    this.dismiss();
  }

}
