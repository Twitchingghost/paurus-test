import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ProfessorsComponent } from './professors/professors.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';

import { TableModule } from 'primeng/table'


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    HomeComponent,
    StudentEditComponent,
    ProfessorsComponent,
    CoursesComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
