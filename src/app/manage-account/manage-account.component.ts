import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  @ViewChild('manageModal') content: any;
  @ViewChild('loginModal') loginModal: any;
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

  constructor(private modal: NgbModal, private db: AngularFireDatabase, public authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentAuthStatus.subscribe((authStatus) => {
      this.user = authStatus;

      if (this.user){

      this.infoSubscription = this.db.object("/staff/" + this.user.uid).valueChanges().subscribe((user) => {
        this.staff = user;
        this.originalCopy = Object.assign({}, user);
      });
      }
      else{
        if (this.infoSubscription){
          this.infoSubscription.unsubscribe();
        }
      }

    });
  }

  open() {
    // and use the reference from the component itself
    this.modal.open(this.content, {size: 'sm', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        console.log(reason);
    });
  }

  cancelEmail(){
    this.editEmail = false;

    this.staff.email = this.originalCopy.email;

    console.log(this.staff.email + "/" + this.originalCopy.email);
  }

  async applyEmail(){

    var result;

    result = await this.authService.changeEmail(this.staff.email);

    if (result === "auth/requires-recent-login"){
      this.loginMessage();

      //show change if successful
    }
    
    // other error: email already exists...
    else if (result === ""){

    }

    else if (result === undefined){

      //need to get new originalCopy?

      this.updateDbEmail();

      this.cancelEmail();

    }

    console.log(result);
  }

  //call this at launch (because of possible email change through link
  updateDbEmail(){

    this.authService.changeEmail(this.user.email);

  }

  loginMessage(){

    this.loginModalRef = this.modal.open(this.loginModal, {size: 'sm', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        console.log(reason);
    });

  }

  async login() {

    if (!await this.authService.login(this.email, this.password)){
      //display message
    }
    else{
      //close modal

      //this.loginModalRef.close();

      //this.loginModal.hide();

      this.closeButton.nativeElement.click();
    }

    this.email = this.password = '';
  }

}
