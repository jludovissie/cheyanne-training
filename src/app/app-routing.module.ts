import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurd } from './shared/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WorkoutplannerComponent } from './workoutplanner/workoutplanner.component';

const routes: Routes = [

    {path:"", component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path:'workout' , component: WorkoutplannerComponent, canActivate: [AuthGaurd]},
    {path:'signup', component: SignUpComponent},
    {path:'login' , component: LoginComponent},
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
