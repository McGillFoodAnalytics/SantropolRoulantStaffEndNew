import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-note',
  templateUrl: './staff-note.component.html',
  styleUrls: ['./staff-note.component.scss']
})
export class StaffNoteComponent implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() eventType: string;
  @Input() date: string;
  @Input() staffNote: string;
  @Output() insertStaffNote: EventEmitter<any> = new EventEmitter<any>();
  private modalReference;
  private touched = false;
  private currentStaffNote: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.currentStaffNote = this.staffNote ? this.staffNote : '';
  }


  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
                                                            size: 'sm',
                                                            windowClass: 'staff-note',
                                                            centered: true});
  }

  onSubmit() {
    this.insertStaffNote.emit(this.currentStaffNote);
    this.modalReference.close();
    this.touched = false;
  }

  close() {
    this.touched = false;
    this.currentStaffNote = this.staffNote ? this.staffNote : '';
  }

  touch() {
    this.touched = true;
  }
}
