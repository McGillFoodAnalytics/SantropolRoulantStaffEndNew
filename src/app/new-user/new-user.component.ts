import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../shared/models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {firebase} from '@firebase/app';
import '@firebase/auth';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  private model = new User();
  private myForm: FormGroup;
  private modalReference;
  private today: Date;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private formBuilder: FormBuilder) {
    this.today = new Date();
  }

  ngOnInit() {
    this.model.emergency_contact_name = "";
    this.model.emergency_relationship = "";
    this.model.emergency_contact_number = "";
    var phoneNumPattern = new RegExp("^[0-9]{10}$");

    this.myForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      address_number: ['', Validators.required],
      address_street: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postal_code: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.pattern(phoneNumPattern)],
      emergency_contact_name: [""],
      emergency_relationship: [""],
      emergency_contact_number: ["", Validators.pattern(phoneNumPattern)]
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  newUser(user: any): void {
    user.id = user.last_name.charAt(0).toLowerCase() + user.last_name.charAt(1).toLowerCase() + user.phone_number;
    
    // Create a dummy app so that current user is not signed out 
    let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
    let authWorkerAuth = firebase.auth(authWorkerApp);
    authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

        // Use the dummy app to create a new user
        authWorkerAuth.createUserWithEmailAndPassword(user.email, user.email)
        .then((userCredential) => {
          // Signed in 
          console.log(userCredential.user.uid);
          this.db.object('/user/' + user.id)
          .update({
              address_city: user.address_city,
              address_number: user.address_number,
              address_postal_code: user.address_postal_code,
              address_street: user.address_street,
              dob: user.dob,
              email: user.email,
              first_name: user.first_name,
              key: userCredential.user.uid, // Firebase User UID
              active_status: true,
              last_name: user.last_name,
              no_show: 0,
              phone_number: user.phone_number,
              emergency_contact_number: user.emergency_contact_number,
              emergency_contact_name: user.emergency_contact_name,
              emergency_relationship: user.emergency_relationship,
              signup_date: formatDate(new Date(), 'yy/MM/dd', 'en'),
              cancellations: 0
          })
          //console.log(originalUser)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        });
  }

  onSubmit(f){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.modalReference.close();
      this.newUser(this.model);
      this.model = new User();
      this.myForm.reset();
    }
  }
}
