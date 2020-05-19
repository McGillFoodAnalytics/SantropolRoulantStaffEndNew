import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mark-important-event',
  templateUrl: './mark-important-event.component.html',
  styleUrls: ['./mark-important-event.component.scss']
})
export class MarkImportantEventComponent implements OnInit {
  private modalReference;
  private model: any = {};
  private form: FormGroup;
  private eventTypes = {'Kitchen AM': 'kitam', 'Kitchen PM': 'kitpm', 'Meal Delivery': 'deliv', 'Meal Delivery Driver': 'deldr'};
  private eventsRef: AngularFireList<any>;
  private events: Observable<any[]>;
  private eventDates = {};


  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private formBuilder: FormBuilder) {
    this.eventsRef = db.list('event');
    this.events = this.eventsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );
    this.formatEventDates();
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      event_type: ['', Validators.required],
      event_date: ['', Validators.required]
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'my-class', centered: true});
  }

  formatEventDates(){
    this.events.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          var event_date = snapshot.event_date.toString();
          var event_type = snapshot.event_type.toString();
          event_date = this.formatDate(event_date);
          if (!(event_date in this.eventDates)){
            this.eventDates[event_date] = {};
            this.eventDates[event_date][event_type] = [snapshot.id];
          }
          else{
            if (!(event_type in this.eventDates[event_date])){
              this.eventDates[event_date][event_type] = [snapshot.id];
            }
            else{
              this.eventDates[event_date][event_type].push(snapshot.id);
            }
          }
        });
    });
  }

  formatDate(date: string){
    const year = "20" + date.substring(0,2);
    const month = date.substring(2,4);
    const day = date.substring(4,6);
    date = month+'/'+day+'/'+year;
    return date;
  }

  formatEventType(event_type: string){

  }

  onSubmit(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modalReference.close();
      const event_date = this.model.event_date;
      const event_type = this.model.event_type;
      this.markImportantEvents(event_date, event_type);
      this.form.reset();
      this.model = {};
    }
  }

  markImportantEvents(event_date: string, event_type: string){
    var event_type = this.eventTypes[event_type];
    var important_events = this.eventDates[event_date][event_type];
    for (var event of important_events){
      this.markEventAsImportant(event);
    }
  }

  markEventAsImportant(event_id: string){
    this.db.object('/event/' + event_id).update(
      {
        is_important_event: true
      }
    );
  }

}
