import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotsComponent } from './slots/slots.component';
import { AppointmentsComponent } from './appointments/appointments.component';


const routes: Routes = [
{path:'slots', component:SlotsComponent},
{path:'appointments', component:AppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
