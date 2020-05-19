import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-permanent-event',
  templateUrl: './mark-permanent-event.component.html',
  styleUrls: ['./mark-permanent-event.component.scss']
})
export class MarkPermanentEventComponent implements OnInit {
  private modalReference;
  private model: any = {};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'my-class', centered: true});
  }
}
