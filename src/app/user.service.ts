import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export type CreateUserRequest = { displayName: string, email: string, role: string, phoneNumber: string }
export type UpdateUserRequest = { uid: string} & CreateUserRequest

@Injectable({
 providedIn: 'root'
})
export class UserService {

 private baseUrl = 'https://us-central1-santropolroulant-b4d14.cloudfunctions.net/api/users'

 constructor(
   private http: HttpClient,
 ) { }
  get users$(): Observable<any[]> {
   return this.http.get<{ users: any[] }>(`${this.baseUrl}`).pipe(
     map(result => {
       return result.users
     })
   )
 }

 user$(id: string): Observable<any> {
   return this.http.get<{ user: any }>(`${this.baseUrl}/${id}`).pipe(
     map(result => {
       return result.user
     })
   )
 }

 create(user: CreateUserRequest) {
   return this.http.post(`${this.baseUrl}`, user)
 }

 edit(user: UpdateUserRequest) {

  console.log("update request")
  console.log(user)

   return this.http.patch(`${this.baseUrl}/${user.uid}`, user)
 }

 delete(uid){
   return this.http.delete(`${this.baseUrl}/${uid}`)
 }

 passwordReset(id){

   return this.http.patch(`${this.baseUrl}/auth/${id}`, null)

 }



}