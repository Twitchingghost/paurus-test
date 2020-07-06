import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student = null;
  message = '';
  coursesData = [
    {id: 0, name: 'Maths', isChecked: false},
    {id: 1, name: 'Science', isChecked: false},
    {id: 2, name: 'English', isChecked: false},
    {id: 3, name: 'Programing', isChecked: false}
  ];
  courses: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.paramMap.get('id'));
    this.getCourses();
  }

  getStudent(id){
    this.dataService.getOneStudent(id)
    .subscribe(
      data => {
        this.student = data;
        console.log(data);
        this.checkCourses();
      },
      error => {
        console.log(error)
      }
    )
  };
  addRemove(cb: string, index: number){
    let checked = this.coursesData[index].name
    if(this.student.courses.includes(checked)){
     this.student.courses.splice(this.student.courses.indexOf(checked), 1);
    }else{
      this.student.courses.push(checked);
    }
  };
  checkCourses(){
    for(var i = 0; i < this.student.courses.length; i++){
      for(var j = 0; j < this.coursesData.length; j++){
        if(this.student.courses[i] === this.coursesData[j].name){
          this.coursesData[j].isChecked = true;
        }
      }
    }
  }
  updateCourses(){
    const data = {
      _id: this.student.id,
      name: this.student.name,
      surrname: this.student.surrname,
      courses: this.student.courses
    };
    this.dataService.updateStudent(data._id, data)
      .subscribe(
        response => {
          console.log(response);
          this.updateCourseAtendance();
          this.router.navigate(['/students'])
        },
        error => {
          console.log(error);
        }
      )
  }
  updateCourseAtendance(){
    for(var i = 0; i < this.courses.length; i++){
      if(this.student.courses.includes(this.courses[i].name) && !this.courses[i].students.includes(this.student.name)){
        this.courses[i].students.push(this.student.name + ' ' + this.student.surrname)
        let data = {
          name: this.courses[i].name,
          students: this.courses[i].students,
          proffesors: this.courses[i].proffesors,
        }
        console.log(data)
        this.dataService.updateCourse(this.courses[i].id, data)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error)
            }
          )
      }
    }
    
  }
  deleteStudent(){
    this.dataService.deleteStudent(this.student.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/students'])
        },
        error => {
          console.log(error);
        }
      )
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
