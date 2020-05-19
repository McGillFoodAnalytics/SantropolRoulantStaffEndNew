import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-note',
  templateUrl: './event-note.component.html',
  styleUrls: ['./event-note.component.scss']
})
export class EventNoteComponent implements OnInit {
  @Input() eventType: string;
  @Input() date: string;
  @Input() eventNote: string;
  @Output() updateEventNote: EventEmitter<any> = new EventEmitter<any>();
  private modalReference;
  private touched = false;
  private currentEventNote: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.currentEventNote = this.eventNote ? this.eventNote : '';
  }


  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
                                                            size: 'sm',
                                                            windowClass: 'staff-note',
                                                            centered: true});
  }

  onSubmit() {
    this.updateEventNote.emit(this.eventNote);
    this.modalReference.close();
    this.touched = false;
    this.currentEventNote = this.eventNote;
  }

  close() {
    this.touched = false;
    this.eventNote = this.currentEventNote;
  }

  touch() {
    this.touched = true;
  }
}
