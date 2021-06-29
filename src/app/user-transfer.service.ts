import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {

  constructor() { }

  userSubject = new BehaviorSubject(null);

  next(user){
    this.userSubject.next(user);
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

}
