import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ErrorStateMatcher } from "@angular/material/core";

/**/
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { filter, switchMap } from "rxjs/operators";
import { Console } from "console";

import { UserService } from "../user.service";
import { interval } from "rxjs";

import { UserFormComponent } from "../user-form/user-form.component";
import { AdminManageUserComponent } from "../admin-manage-user/admin-manage-user.component";

import { UserTransferService } from "../user-transfer.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export type CreateUserRequest = {
  displayName: string;
  password: string;
  email: string;
  role: string;
};
export type UpdateUserRequest = { uid: string } & CreateUserRequest;

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-admin-settings",
  templateUrl: "./admin-settings.component.html",
  styleUrls: ["./admin-settings.component.css"],
})
export class AdminSettingsComponent implements OnInit {
  @ViewChild("adminModal") adminModal: any;
  @ViewChild("manageUserModal") manageUserModal: any;
  closeResult: string;
  dataSource: any;

  private baseUrl =
    "https://us-central1-santropolroulant-b4d14.cloudfunctions.net/api/users";

  users$: Observable<any[]>;
  user$: Observable<any>;

  searchFilter: any = "";

  private addAccountForm: FormGroup;
  private emailFormControl: FormControl;
  private matcher: any;

  private refresh: Subscription;

  behaviorSubject: any;

  constructor(
    private userService: UserService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private userTransfer: UserTransferService,
    public m: NgbActiveModal
  ) {}

  ngOnInit() {
    this.behaviorSubject = new BehaviorSubject(null);
    /*
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.matcher = new MyErrorStateMatcher();
    this.addAccountForm = this.formBuilder.group({
      privileges: ['', Validators.required],
    });
    */

    this.refresh = interval(2000).subscribe((val) => {
        this.userService.users$.subscribe((val) => {
          let users = val.filter((x) => x.role === "admin" || x.role === "staff");
          this.behaviorSubject.next(users);
          
        });
      });

    //this.users$ = this.userService.users$

    this.user$ = this.afAuth.user.pipe(
      filter((user) => !!user),
      switchMap((user) => this.userService.user$(user.uid))
    );
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  open() {
    // and use the reference from the component itself
    this.modal
      .open(this.adminModal, { size: "lg", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //console.log(reason);
        }
      );
  }

  manage(user) {
    //change from uid to user
    //create component for modal
    this.userTransfer.next(user);

    const modalRef = this.modal.open(AdminManageUserComponent, {
      size: "md",
      centered: true,
    });

    modalRef.result.then(
      (result) => {
        this.userService.edit(result).subscribe((_) => {
          console.log("user updated");
        });
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //console.log(reason);
      }
    );
  }

  add() {
    /*
    console.log(this.emailFormControl.value + " / " + this.addAccountForm.controls["privileges"].value);
    this.userService.create().subscribe(_ => {
      console.log('user created');
    });
    */
    const modalRef = this.modal.open(UserFormComponent, { centered: true });
    modalRef.result
      .then((user) => {
        this.userService.create(user).subscribe((_) => {
          console.log("user created");
        });
      })
      .catch((err) => {});
  }
}
