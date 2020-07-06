import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.dataService.getCourses()
      .subscribe(
        response => {
          this.courses = response;
          console.log(response)
        }
      )
  }

}
