import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserService } from '../user.service';
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
  isAdmin: boolean;

  constructor(
    private modalService: NgbModal, 
    private db: AngularFireDatabase, 
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    private userService: UserService) {
    this.result = db.object('/registration_code').valueChanges();
  }

  ngOnInit() {

    this.authService.currentAuthStatus.subscribe((authStatus) => {
      var user = authStatus;
      if (user){
        this.userService.user$(user.uid).subscribe((val) => { 
          this.isAdmin = (val.role == "admin") ? true : false;
        });
      }
    });

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
