import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {

  constructor() { }

  userSubject = new BehaviorSubject(null);

  loginStatus = new BehaviorSubject(false);

  next(user){
    this.userSubject.next(user);
  }

  loginUpdate(state){
    this.loginStatus.next(state);
  }
  /*

  get user() {
    return this.userSubject.asObservable().pipe(
      map(uf => uf.user)
    );
  }

  */

  user(){
    return this.userSubject;
  }

  getLoginState(){
    return this.loginStatus;
  }

}
