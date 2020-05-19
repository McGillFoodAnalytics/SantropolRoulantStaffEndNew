import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isCollapsed = true;
  private opened: boolean = false;
  private closeOnClickOutside: boolean = true;
  private showBackdrop: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  private onBackdropClicked() {

  }

}
