import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "../../firebase-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-remove-user-from-event",
  templateUrl: "./remove-user-from-event.component.html",
  styleUrls: ["./remove-user-from-event.component.scss"],
})
export class RemoveUserFromEventComponent implements OnInit {

  private userKey;
  @Input() lastName;
  @Input() eventId;
  @Input() userId;
  @Input() cancellationNote;
  @Input() event;
  @Input() date;
  @Input() firstName: string;
  @Input() eventType;
  @Input() isUserProfile; //Boolean used to determine what CSS class is used. 

  @Output() confirmRemove: EventEmitter<any> = new EventEmitter<any>();

  private cancellationType: string;
  private modalReference;
  private model: any = {};

  constructor(private modalService: NgbModal, private fs: FirebaseService) {}

  ngOnInit() {
    this.cancellationType = "";
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "sm",
      windowClass: "remove-volunteer",
      centered: true,
    });
  }

  onSubmit() {
    let sub = this.fs.getUser(this.userId).subscribe(user =>{
      this.userKey = user.key;
      this.fs.addCancellation(this.eventId, this.userId, this.userKey, this.cancellationNote, this.cancellationType);
      sub.unsubscribe();
    });
    this.confirmRemove.emit("true");
    this.modalReference.close();
  }
}
