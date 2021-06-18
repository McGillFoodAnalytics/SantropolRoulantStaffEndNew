import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../shared/models/user";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firebase } from "@firebase/app";
import "@firebase/auth";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {

  private model = new User();
  private myForm: FormGroup;
  private modalReference;
  private today: Date;
  private randPassword;
  private errorMsg;

  @ViewChild('newUserError') templateRefErr: TemplateRef<any>;
  
  constructor(
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder
  ) {
    this.today = new Date();
  }

  ngOnInit() {
    this.model.emergency_contact_name = "";
    this.model.emergency_relationship = "";
    this.model.emergency_contact_number = "";
    var phoneNumPattern = new RegExp("^[0-9]{10}$");

    this.myForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      dob: ["", Validators.required],
      address_number: ["", Validators.required],
      address_street: ["", Validators.required],
      address_city: ["", Validators.required],
      address_postal_code: ["", Validators.required],
      email: ["", Validators.required],
      phone_number: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(phoneNumPattern),
        ]),
      ],
      emergency_contact_name: [""],
      emergency_relationship: [""],
      emergency_contact_number: ["", Validators.pattern(phoneNumPattern)],
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      centered: true
    });
  }

  async newUser(user: any): Promise<void> {
    user.id =
      user.last_name.charAt(0).toLowerCase() +
      user.last_name.charAt(1).toLowerCase() +
      user.phone_number;

    // Create a dummy app so that current user is not signed out
    let authWorkerApp = firebase.initializeApp(
      firebase.app().options,
      "auth-worker"
    );
    let authWorkerAuth = firebase.auth(authWorkerApp);
    authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials
    
    this.randPassword = await this.generateRandomPassword();

    // Use the dummy app to create a new user
    authWorkerAuth
      .createUserWithEmailAndPassword(user.email, this.randPassword)
      .then((userCredential) => {
        // Signed in
        this.db.object("/user/" + user.id).update({
          address_city: user.address_city,
          address_number: user.address_number,
          address_postal_code: user.address_postal_code,
          address_street: user.address_street,
          dob: user.dob,
          email: user.email,
          first_name: user.first_name,
          key: userCredential.user.uid, // Firebase User UID
          active_status: true,
          last_name: user.last_name,
          no_show: 0,
          phone_number: user.phone_number,
          emergency_contact_number: user.emergency_contact_number,
          emergency_contact_name: user.emergency_contact_name,
          emergency_relationship: user.emergency_relationship,
          signup_date: formatDate(new Date(), "yy/MM/dd", "en"),
          cancellations: 0,
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.errorMsg = error.message;
        this.modalService.open(this.templateRefErr, {centered: true});
      });
  }

  onSubmit(f) {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.modalReference.close();
      this.newUser(this.getNewUser());
      this.model = new User();
      this.myForm.reset();
    }
  }

  generateRandomPassword() {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(16);
    randPasswordArray = randPasswordArray.fill(allChars);

    return this.shuffleArray(
      randPasswordArray.map((x) => {
        return x[Math.floor(Math.random() * x.length)];
      })).join("");
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  getNewUser(): User {
    this.model.first_name = this.myForm.get("first_name").value;
    this.model.last_name = this.myForm.get("last_name").value;
    this.model.dob = this.myForm.get("dob").value;
    this.model.address_number = this.myForm.get("address_number").value;
    this.model.address_street = this.myForm.get("address_street").value;
    this.model.address_city = this.myForm.get("address_city").value;
    this.model.address_postal_code = this.myForm.get("address_postal_code").value;
    this.model.email = this.myForm.get("email").value;
    this.model.phone_number = this.myForm.get("phone_number").value;
    this.model.emergency_contact_name = this.myForm.get("emergency_contact_name").value;
    this.model.emergency_relationship = this.myForm.get("emergency_relationship").value;
    this.model.emergency_contact_number = this.myForm.get("emergency_contact_number").value;
    return this.model;
  }
}
