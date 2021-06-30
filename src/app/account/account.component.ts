import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ManageAccountComponent } from '../manage-account/manage-account.component';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import {LoginPopupComponent} from '../login-popup/login-popup.component';

import {FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { UserTransferService } from '../user-transfer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../volunteer-directory/volunteer-directory.component.scss']
})
export class AccountComponent implements OnInit {

    user: any;
    role: any;

    ready = false;

    @ViewChild('adminModal') adminModal: AdminSettingsComponent;

    form = new FormGroup({
      uid: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      displayName: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl('')
    });

    //error = "test";

   ngOnInit(): void {

    console.log("Hide state at launch: " + this.welcomeHide)

    console.log(this.router.url)

    /*
    if coming from toolbar button:
      loggedinmode()
    else
      loginMode()
    */

      if (this.router.url == "/volunteer-account") {
        this.loggedinMode();
    }

   this.ready = true;

    this.authService.currentAuthStatus.subscribe(async (authStatus) => {

    this.user = authStatus;

    if (this.user){
     
      console.log("new user")

      await this.userService.user$(this.user.uid).toPromise().then(res => {

        this.user.role = res.role

        //necessary?
        this.form.patchValue({role: res.role});
      });

        this.userService.user$(this.user.uid).subscribe((val) => { 

          if (!val.phoneNumber || !val.displayName){
            console.log("welcome!!!!!!!!")
            this.welcomeMode();
            this.form.patchValue(this.user)
            console.log(this.form.value)
          }
          else {
  
            this.userTransfer.loginUpdate(true);
            
                if (this.router.url == "/volunteer-account") {
                  this.loggedinMode();
              }
              else if (this.router.url == "/home"){
                this.router.navigate(['/volunteer-schedule']);
              }
          }

        });

    }
    else{
      this.userTransfer.loginUpdate(false);
        this.loginMode();
    }
    });
    

    // Confirm the link is a sign-in with email link.
if (this.auth.isSignInWithEmailLink(window.location.href)) {

  console.log("signing in with url: " + window.location.href)
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  this.auth.signInWithEmailLink(email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}

  }

  email = "";
  password = "";
  firstName = "";
  lastName = "";
  code = "";

  constructor(private userTransfer: UserTransferService, public auth: AngularFireAuth, public authService: AuthService, private router: Router, private userService: UserService, public m: NgbModal) {
    
  }

  shake = false;

  async signup() {

  this.clearError();

  if (this.email.length == 0){
        this.authService.error = "Please fill all fields.";

        this.shake = true;

        setTimeout(() => this.shake = false, 1000);

        return;
  }

    /*
    if (!await this.authService.signup(this.firstName, this.lastName, this.email, this.password, this.code)){
        this.shake = true;

        setTimeout(() => this.shake = false, 1000);
    }
    

    this.email = this.password = this.code = '';
    */

    this.userService.create({email: this.email, role: "staff", displayName: "", phoneNumber: ""}).subscribe(_ => {
      console.log('user created');

      alert("User created, email sign-in link will be sent by email.")

      this.loginMode();
    });
  }

  async login() {

    if (!await this.authService.login(this.email, this.password)){
        this.shake = true;

        setTimeout(() => this.shake = false, 1000);
    }
    else{
        //this.router.navigate(['/volunteer-schedule']);
    }

    //uncomment this?
    //this.email = this.password = '';   
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

  welcomeHide = true;

  center = false;

  resetMode(){

  this.clearError();

    this.loginMsgVisibility = true;
    this.signupMsgVisibility = true;

    this.loginHide = true;
    this.signupHide = true;
    this.loggedinHide = true;
    this.resetHide = false;
    this.welcomeHide = true;

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
    this.welcomeHide = true;

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
    this.welcomeHide = true;

    this.frontBoxMoving = false;
    this.center = false;
  }

  welcomeMode(){

    this.clearError();
  
      this.loginMsgVisibility = true;
      this.signupMsgVisibility = true;
  
      this.loginHide = true;
      this.signupHide = true;
      this.loggedinHide = true;
      this.resetHide = true;

      this.welcomeHide = false;
  
      this.frontBoxMoving = false;
      this.center = true;
    }

  loggedinMode(){

  this.clearError();

    this.loginMsgVisibility = true;
    this.signupMsgVisibility = true;

    this.loginHide = true;
    this.signupHide = true;
    this.loggedinHide = false;
    this.resetHide = true;
    this.welcomeHide = true;

    this.frontBoxMoving = false;
    this.center = true;

    //this.router.navigate(['/volunteer-schedule']);
  }

  clearError(){
        this.authService.error = "";
  }

  open(){

    const modalRef = this.m.open(ManageAccountComponent, {size: 'sm', centered: true});
    modalRef.result.then(user => {

    })
    .catch(e => {
      console.log(e);
  });
    
  }

  openAdminSettings(){
    //this.adminModal.open();

    const modalRef = this.m.open(AdminSettingsComponent, {size: 'lg', centered: true});
    modalRef.result.then(user => {

    })
    .catch(e => {
      console.log(e);
  });
  }

  async submitWelcome(){

    //add conditions for confirm password, email... are valid

    const { uid, phoneNumber, email, displayName, password, confirmPassword, role} = this.form.value;

    console.log(uid, phoneNumber, email, displayName, role);

    var success = true;

    var err = null

    const passwordResult = await this.authService.changePassword(this.form.get('password').value);
    err = passwordResult?.message

    console.log(err)

    //relogin prompt here

    if (passwordResult?.code === "auth/requires-recent-login"){
      this.loginMessage();
    }

    if (!err){

      this.userService.edit({uid, phoneNumber, email, displayName, role: (role ? role : "staff")}).subscribe(
        data => {
          //this.loggedinMode()

          //this.login()

          console.log("Hide state: " + this.welcomeHide)
          this.router.navigate(['/volunteer-schedule']);
          this.userTransfer.loginUpdate(true);
        },
        error => {err = error.error.message; console.log("Error updating info", err)}
      );
    }
  }

  loginMessage(){

    this.m.open(LoginPopupComponent, {size: 'sm', centered: true}).result.then((result) => {
      this.submitWelcome();
    }, (reason) => {
        console.log(reason);
    });

  }
}
