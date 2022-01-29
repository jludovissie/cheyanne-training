import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WorkoutplannerComponent } from './workoutplanner/workoutplanner.component';

const routes: Routes = [

    {path:"", component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path:'workout' , component: WorkoutplannerComponent},
    {path:'signup', component: SignUpComponent},
    {path:'login' , component: LoginComponent},
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
