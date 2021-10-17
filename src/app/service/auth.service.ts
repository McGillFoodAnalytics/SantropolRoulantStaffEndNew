import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, catchError } from 'rxjs/operators';

import firebase from '@firebase/app'
import '@firebase/auth'

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user: Observable<firebase.User>;

  currentUser = null;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  newUser;

  user;

  error = "";

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) {
    //this.user = firebaseAuth.authState;

    this.firebaseAuth.onAuthStateChanged((credential)=>{

    if(credential){
      this.authStatusSub.next(credential);
      this.user = credential;
      console.log("defined: " + this.user.email);
      console.log('User is logged in');
    }
    else{
      this.authStatusSub.next(null);
      console.log('User is logged out');
    }
  })
  }

  async signup(firstName: string, lastName: string, email: string, password: string, code:string) {

    return <boolean> await this.db.object('/registration_code').valueChanges().pipe(take(1)).toPromise().then(details => {

    if (details == code){

       return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        console.log('Success!', value);
        //firebase.auth().currentUser.sendEmailVerification();

        this.newUser = await this.firebaseAuth.currentUser;

        this.addUser(this.newUser.uid, firstName, lastName, email, "staff");

        /*
        this.newUser.sendEmailVerification().then(() => {
        console.log('email sent');
    });
    */
   
        return true;
      })
      .catch(err => {

        this.error = err.message;

        console.log('Something went wrong:', err.message);
        return false;
      });
    }
    else{

        this.error = "Registration code is incorrect.";

        return false;
    }

    });

  }

  async login(email: string, password: string){

    return <boolean> await this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => 
    {

        return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => 
      {
        console.log('Nice, it worked!');
        return true;
      })
      .catch(err => 
      {
        console.log('Something went wrong:', err.message);
        return false;
      });

    })
      
    .catch((error) => 
        {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.error(errorCode, errorMessage);
        return false;
        
     });

  }

  logout() {
    this.firebaseAuth.signOut();
  }

  reset(email: string){
    this.firebaseAuth.sendPasswordResetEmail(email);
  }

  //remove this
  addUser(uid, firstName, lastName, email, privilege){
    this.db.object('/staff/' + uid)
    .update({
        email: email,
        first_name: firstName,
        last_name: lastName,
        privilege: privilege,
     });
  }

  changeEmail(newEmail){

    return this.user.updateEmail(newEmail)
    .catch((err) => {

      console.log(err);

      return err.code;
    }
    );
  }

  async changePassword(newPassword){

    /*
    return this.user.updatePassword(newPassword).then(() => {
      // Update successful.
    }, (error) => {
      // An error happened.

      return error;
    });
    */

    return await this.user.updatePassword(newPassword)
    .catch(err => {
      return err
    });
  }
}
