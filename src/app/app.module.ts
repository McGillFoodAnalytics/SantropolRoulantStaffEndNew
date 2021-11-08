import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppConfig } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
// NG Translate
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { VolunteerDirectoryComponent } from './volunteer-directory/volunteer-directory.component';

import {AuthTokenHttpInterceptorProvider} from './auth-token.interceptor';
import {FilterByPipe} from './filter.pipe';

//materialImports
//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NewUserComponent } from './new-user/new-user.component';
import {MatBadgeModule} from '@angular/material/badge';
import { UserFormComponent } from './user-form/user-form.component';

import { AgGridModule } from 'ag-grid-angular';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// AoT requires an exported function for factories
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

import {ChangeRegistrationCodeComponent} from './change-registration-code/change-registration-code.component';
import {MarkImportantEventComponent } from './mark-important-event/mark-important-event.component';
import {SignUpSheetComponent} from './sign-up-sheet/sign-up-sheet.component';
import {SliderComponent} from './slider/slider.component';
import {AddUserToEventComponent} from './sign-up-sheet/add-user-to-event/add-user-to-event.component';
import {RemoveUserFromEventComponent} from './sign-up-sheet/remove-user-from-event/remove-user-from-event.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {PermanentVolunteerComponent} from './permanent-volunteer/permanent-volunteer.component';
import {PermanentVolunteerDirectoryComponent} from './permanent-volunteer-directory/permanent-volunteer-directory.component';
import {EventSignUpTableComponent} from './sign-up-sheet/event-sign-up-table/event-sign-up-table.component';
import {BugReportComponent} from './bug-report/bug-report.component';
import {StaffNoteComponent } from './sign-up-sheet/staff-note/staff-note.component';
import {NotificationsComponent} from './toolbar/notifications/notifications.component';
import {EventNoteComponent} from './sign-up-sheet/event-note/event-note.component';
import {UserEventComponent} from './user-event/user-event.component';
//import {HomeComponent} from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeekGeneratorComponent } from './week-generator/week-generator.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountComponent } from './account/account.component';
import { UserNoteComponent } from './user-event/user-note/user-note.component';
import { PastWeekComponent } from './past-week/past-week.component';
import { AdminManageUserComponent } from './admin-manage-user/admin-manage-user.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { CopyrightFooterComponent } from './copyright-footer/copyright-footer.component';

//translate:

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {
    path: '',
    component: AccountComponent//SignUpSheetComponent
  },
    {
    path: 'volunteer-account',
    component: AccountComponent
  },
  {
    path: 'volunteer-schedule',
    component: SignUpSheetComponent
  },
  {
    path: 'volunteer-directory',
    component: VolunteerDirectoryComponent
  },
  {
    path: 'volunteer/:id',
    component: UserProfileComponent
  },
  {
    path: 'perm-volunteer-directory',
    component: PermanentVolunteerDirectoryComponent
  },
  {
    path: 'past-week',
    component: PastWeekComponent//SignUpSheetComponent
  },
  {
    path: '**',
    component: AccountComponent//SignUpSheetComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    ChangeRegistrationCodeComponent,
    MarkImportantEventComponent,
    SignUpSheetComponent,
    //HomeComponent,
    SliderComponent,
    AddUserToEventComponent,
    RemoveUserFromEventComponent,
    ToolbarComponent,
    PermanentVolunteerComponent,
    PermanentVolunteerDirectoryComponent,
    EventSignUpTableComponent,
    BugReportComponent,
    StaffNoteComponent,
    NotificationsComponent,
    EventNoteComponent,
    VolunteerDirectoryComponent,
    UserEventComponent,
    WeekGeneratorComponent,
    UserProfileComponent,
    AccountComponent,
    UserNoteComponent,
    PastWeekComponent,
    AdminManageUserComponent,
    AdminSettingsComponent,
    FilterByPipe,
    ManageAccountComponent,
    UserFormComponent,
    LoginPopupComponent,
    CopyrightFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    MatBadgeModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    CoreModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
    SharedModule,
    FontAwesomeModule,
    DetailModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
