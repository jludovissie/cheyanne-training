import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WorkoutplannerComponent } from './workoutplanner/workoutplanner.component';

const routes: Routes = [

    {path:"", component: HomeComponent, pathMatch: 'full'},
    {path:'workout' , component: WorkoutplannerComponent},
    {path:'contact', component: SignUpComponent}
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
