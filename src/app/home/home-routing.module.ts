import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { VolunteerDirectoryComponent} from '../volunteer-directory/volunteer-directory.component'
const routes: Routes = [
  {
    path: 'home',
    component: VolunteerDirectoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
