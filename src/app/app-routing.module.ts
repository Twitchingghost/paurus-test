import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ProfessorsComponent } from './professors/professors.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
  {path: 'studentedit/:id', component: StudentEditComponent, canActivate: [AuthGuard]},
  {path: 'professors', component: ProfessorsComponent, canActivate: [AuthGuard]},
  {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
