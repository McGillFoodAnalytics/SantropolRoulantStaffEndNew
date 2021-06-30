import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {UserService} from '../user.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    role: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl(''),
  });

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
  ) { }

  ngOnInit() {

  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  save() {
    const { displayName, email, role, phoneNumber } = this.form.value;
    this.modal.close({ displayName, email, role, phoneNumber });
  }

}
