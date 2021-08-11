import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../firebase-service.service";

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss']
})
export class UserNoteComponent implements OnInit {

  currentUserNote: any;
  validId: boolean;
  editMode: boolean;
  private userNote: string;
  @Input() userId: string;

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {

    this.editMode = false;
    // Get the note of the current user's profile
    let sub = this.firebase.getUser(this.userId).subscribe((element) => {
      this.currentUserNote = (element.note != undefined) ? element.note : "";
      
      if(element == null){
        this.validId = false;
      }
      else{
        this.validId = true;
      }
      sub.unsubscribe();
    });
  }

  editNote(){
    if(this.editMode) {
      this.saveNote();
    }else{
      this.editMode = true;
    }
  }

  // Update user with new note
  saveNote(){
    this.editMode = false;
    this.firebase.updateUserNote(this.userId, this.userNote);
  }
}
