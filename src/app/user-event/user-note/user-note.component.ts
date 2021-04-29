import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../firebase-service.service";

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.css']
})
export class UserNoteComponent implements OnInit {

  currentUserNote: any;
  private userNote: string;
  @Input() userId: string;

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.firebase.getUser(this.userId).subscribe((element) => {
      this.currentUserNote = element.note;
      console.log(this.currentUserNote);
    });

  }

  saveNote(){
    this.firebase.updateUserNote(this.userId, this.userNote);
  }
}
