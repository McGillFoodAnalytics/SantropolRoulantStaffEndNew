import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../shared/models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  //disabledAgreement: boolean = true;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private formBuilder: FormBuilder) {
    this.today = new Date();
  }

  ngOnInit() {
   this.myForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      address_number: ['', Validators.required],
      address_street: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postal_code: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      emergency_contact_name: ['', Validators.required],
      emergency_relationship: ['', Validators.required],
      emergency_contact_number: ['', Validators.required]
    });
  }

  open(content) {
    //this.disabledAgreement = false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }
  
  //enable adding emergency contact information inputs
  // changeCheck(event){
  //   this.disabledAgreement = !this.disabledAgreement;
  // }

  newUser(user: any): void {
  user.id = user.first_name.charAt(0).toLowerCase() + user.last_name.charAt(0).toLowerCase() + user.phone_number;
  this.db.object('/user/' + user.id)
    .update({
      address_city: user.address_city,
      address_number: user.address_number,
      address_postal_code: user.address_postal_code,
      address_street: user.address_street,
      dob: user.dob,
      email: user.email,
      first_name: user.first_name,
      key: user.id,
      last_name: user.last_name,
      no_show: 0,
      phone_number: user.phone_number,
      emergency_contact_number: user.emergency_contact_number,
      emergency_contact_name: user.emergency_contact_name,
      emergency_relationship: user.emergency_relationship,
      signup_date: formatDate(new Date(), 'yy/MM/dd', 'en'),
      cancellations: 0
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
