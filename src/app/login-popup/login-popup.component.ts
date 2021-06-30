import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})

export class LoginPopupComponent implements OnInit {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  constructor(public authService: AuthService, public modal: NgbActiveModal) { }

  user: any;
  password = "";

  ngOnInit(): void {

    this.authService.currentAuthStatus.subscribe(async (authStatus) => {

      this.user = authStatus;

    });
  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  async login() {

    if (!await this.authService.login(this.user.email, this.password)){
      //display message

      this.closeButton.nativeElement.click();
    }
    else{
      //close modal

      //this.loginModalRef.close();

      //this.loginModal.hide();

      this.closeButton.nativeElement.click();
    }

    this.password = '';
  }

}
