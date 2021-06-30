import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserTransferService } from '../user-transfer.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService, private userTransfer: UserTransferService) { }

  show = false;

  ngOnInit() {

    /*

    this.authService.currentAuthStatus.subscribe((authStatus) => {

    if (authStatus){
        this.show = true;
    }
    else{
        this.show = false;
    }
    });
    */

    this.userTransfer.getLoginState().subscribe((state) => {
      this.show = state;
    });

  }

  open(menu) {
    menu.openMenu();
  }
}
