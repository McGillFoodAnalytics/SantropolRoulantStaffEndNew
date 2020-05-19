import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-registration-code',
  templateUrl: './change-registration-code.component.html',
  styleUrls: ['./change-registration-code.component.scss']
})
export class ChangeRegistrationCodeComponent implements OnInit {
  private registration_code: string;
  private modalReference;
  private model: any = {};
  private myForm: FormGroup;
  result: Observable<any>;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private formBuilder: FormBuilder) {
    this.result = db.object('/registration_code').valueChanges();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      new_registration_code: ['', Validators.required]
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
                                                            size: 'sm',
                                                            windowClass: 'change-registration-code',
                                                            centered: true});
  }

  updateRegistrationCode(): void {
  this.db.object('/')
    .update({
      registration_code: this.registration_code
     });
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.registration_code = this.model.registration_code;
      this.updateRegistrationCode();
      this.modalReference.close();
      this.myForm.reset();
      this.model = {};
    }
  }
}
