import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ManageAccountComponent } from '../manage-account/manage-account.component';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../volunteer-directory/volunteer-directory.component.scss']
})
export class AccountComponent implements OnInit {

    user: string;

    @ViewChild('manageModal') modal: ManageAccountComponent;
    @ViewChild('adminModal') adminModal: AdminSettingsComponent;

    //error = "test";

  ngOnInit(): void {

    this.authService.currentAuthStatus.subscribe((authStatus) => {

    this.user = authStatus;

    if (this.user){
        this.loggedinMode();
    }
    else{
        this.loginMode();
    }
    });
  }

  email = "";
  password = "";
  firstName = "";
  lastName = "";
  code = "";

  constructor(public authService: AuthService, private router: Router) {
    
  }

  shake = false;

  async signup() {

  this.clearError();

  if (this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0 || this.password.length == 0 || this.code.length == 0){
        this.authService.error = "Please fill all fields.";

        this.shake = true;

        setTimeout(() => this.shake = false, 1000);

        return;
  }

    if (!await this.authService.signup(this.firstName, this.lastName, this.email, this.password, this.code)){
        this.shake = true;

        setTimeout(() => this.shake = false, 1000);
    }
    

    this.email = this.password = this.code = '';
  }

  async login() {

    if (!await this.authService.login(this.email, this.password)){
        this.shake = true;

        setTimeout(() => this.shake = false, 1000);
    }
    else{
        this.router.navigate(['/volunteer-schedule']);
    }

    this.email = this.password = '';   
  }

  logout() {
    this.authService.logout();
  }

  reset(){
        this.authService.reset(this.email);
        this.loginMode();
  }

  loginMsgVisibility = false;
  signupMsgVisibility = true;
  loggedinMsgVisibility = true;

  frontBoxMoving = false;

  loggedinHide = true;
  loginHide = false;
  signupHide = true;
  resetHide = true;

  center = false;

  resetMode(){

  this.clearError();

    this.loginMsgVisibility = true;
    this.signupMsgVisibility = true;

    this.loginHide = true;
    this.signupHide = true;
    this.loggedinHide = true;
    this.resetHide = false;

    this.frontBoxMoving = false;
    this.center = true;
  }
  

  signupMode(){

  this.clearError();

    this.loginMsgVisibility = true;
    this.signupMsgVisibility = false;

    this.loginHide = true;
    this.signupHide = false;
    this.loggedinHide = true;
    this.resetHide = true;

    this.frontBoxMoving = true;
    this.center = false;
  }

  loginMode(){

  this.clearError();

    this.loginMsgVisibility = false;
    this.signupMsgVisibility = true;

    this.loginHide = false;
    this.signupHide = true;
    this.loggedinHide = true;
    this.resetHide = true;

    this.frontBoxMoving = false;
    this.center = false;
  }

  loggedinMode(){

  this.clearError();

  //console.log("hiar");

    this.loginMsgVisibility = true;
    this.signupMsgVisibility = true;

    this.loginHide = true;
    this.signupHide = true;
    this.loggedinHide = false;
    this.resetHide = true;

    this.frontBoxMoving = false;
    this.center = true;
  }

  clearError(){
        this.authService.error = "";
  }

  open(){
    this.modal.open();
  }

  openAdminSettings(){
    this.adminModal.open();
  }

}
