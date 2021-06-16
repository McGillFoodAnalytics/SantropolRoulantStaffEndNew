import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../firebase-service.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-permanent-volunteer",
  templateUrl: "./permanent-volunteer.component.html",
  styleUrls: ["./permanent-volunteer.component.scss"],
})
export class PermanentVolunteerComponent implements OnInit {
  
  private modalReference;
  private volunteers: any = [];
  private shiftsNotAdded: any = [];
  private volunteersObservable;
  private events: any = [];
  private eventsObservable;
  private model: any = {};
  private user: any = {};
  private addPermanentForm: FormGroup;
  displayedColumns: string[] = ['shiftType', 'shiftDate'];
  addingShifts: boolean;

  shiftTypes = {
    kitam: "Kitchen AM",
    kitpm: "Kitchen PM",
    deldr: "Delivery Driver",
    deliv: "Delivery",
  };

  today: Date;
  dateInThreeMonths: Date;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fs: FirebaseService
  ) {
    this.today = new Date();

    //Set max date to three months from present to add a recurring volunteer
    this.dateInThreeMonths = new Date();
    this.dateInThreeMonths.setMonth(this.dateInThreeMonths.getMonth() + 3);
  }

  ngOnInit() {
    this.volunteersObservable = this.fs.getUsers();
    this.eventsObservable = this.fs.getPermanentEvents();
    this.volunteersObservable.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        this.volunteers.push(snapshot);
      });
    });
    this.eventsObservable.subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        this.events.push(snapshot);
      });
    });

    this.addPermanentForm = this.formBuilder.group({
      frequency: ["", Validators.required],
      endDate: ["", Validators.required],
      startDate: ["", Validators.required],
      volunteer: [["", "", ""], Validators.required],
      eventType: ["", Validators.required],
    });
  }

  endDateRequiredError() {
    return (
      this.model.endDate == undefined ||
      this.model.endDate == null ||
      this.model.endDate < this.model.startDate
    );
  }

  startDateRequiredError() {
    return this.model.startDate == undefined || this.model.startDate == null;
  }

  /**
   * @param content defined in html file for each ng-template
   * @param windowClass defined in css file for each ng-template
   * @returns 
   */
  open(content, windowClass) {
    // Only open the pop-up for 'loading' after all input fields are validated. 
    // Boolean "addingShifts" is made true when input fields are valid.
    if (windowClass == "loading-screen") {
      if (!this.addingShifts) {
        // Do not continue to open 
        return;
      }
    }
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "sm",
      windowClass: windowClass,
      centered: true,
    });
  }

  onSubmit(event, template) {
    this.user = this.model;
    if (event == "remove") {
      this.modalReference.close();
    }
    if (event == "add") {
      this.addPermanentForm.markAllAsTouched();
      if (this.addPermanentForm.valid) {
        this.modalReference.close();
        this.addingShifts = true;
        this.fs.addPermanentVolunteer(
          this.model.eventType,
          this.model.volunteer,
          this.model.startDate,
          this.model.endDate,
          this.model.frequency
        ).then(data => {
          this.shiftsNotAdded = data;
          this.modalReference.close();  //currently open window is laoding gif 
          this.addingShifts = false;
          if(this.shiftsNotAdded.length > 0){
            this.open(template, "permanent-volunteer-warning");
          }
      });
        this.addPermanentForm.reset();
        this.model = {};
      }
    }
  }

  getShift(element: string){
    let shiftCode = element.substring(0,5);
    return this.shiftTypes[shiftCode];
  }

  getDate(element: string) {
    let code1 = element.substring(5);

    let day = code1.substring(4);
    let month = code1.substring(2,4);
    let year = "20" + code1.substring(0,2);
  
    // Create Date type to extract month in string format easily
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // MonthName is the month in plain language, i.e. January
    let monthName = newDate.toLocaleString('default', { month: 'long' });
    let date =  monthName + " " + day + ", " + year;
    return date;
  }
}