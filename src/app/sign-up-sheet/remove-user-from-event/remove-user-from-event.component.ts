import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-user-from-event',
  templateUrl: './remove-user-from-event.component.html',
  styleUrls: ['./remove-user-from-event.component.scss']
})
export class RemoveUserFromEventComponent implements OnInit {
  @Input() lastName;
  @Input() event;
  @Input() date;
  @Input() firstName: string;
  @Input() eventType;
  @Output() confirmRemove: EventEmitter<any> = new EventEmitter<any>();
  private modalReference;
  private model: any = {};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {}

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
                                                            size: 'sm',
                                                            windowClass: 'remove-volunteer',
                                                            centered: true});
  }

  onSubmit() {
    this.confirmRemove.emit('true');
    this.modalReference.close();
  }

}
