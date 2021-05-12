import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  show = false;

  ngOnInit() {

    this.authService.currentAuthStatus.subscribe((authStatus) => {

    if (authStatus){
        this.show = true;
    }
    else{
        this.show = false;
    }
    });

  }

  open(menu) {
    menu.openMenu();
  }
}
