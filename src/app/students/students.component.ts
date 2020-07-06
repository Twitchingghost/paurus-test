import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service'
import { 
  FormBuilder, 
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  student = {
    _id: null,
    name: '',
    surrname: '',
    courses: []
  };
  coursesData = [
    {id: 0, name: 'Maths', isChecked: false},
    {id: 1, name: 'Science', isChecked: false},
    {id: 2, name: 'English', isChecked: false},
    {id: 3, name: 'Programing', isChecked: false}
  ]
  submitted = false;
  form: FormGroup;
  students: any;

  

  constructor(
    private dataService: DataService,
  ) { 
  }

  ngOnInit(): void {
    this.getStudents()

  }
  

  submit() {
    this.saveStudent();
  }

  addRemove(cb: string, index: number){
    let checked = this.coursesData[index].name
    if(this.student.courses.includes(checked)){
     this.student.courses.splice(this.student.courses.indexOf(checked), 1);
    }else{
      this.student.courses.push(checked);
    }
  }
  
  generateId(n){
    if (n===1){
      return [0,1];
    }else {
      var s = this.generateId(n-1);
      s.push(s[s.length - 1] + s[s.length -2]);
      var i = s.length
      return s;
    }
  }
  getRandomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min
  }
  saveStudent(){

    let a = this.generateId(this.students.length+1)[this.students.length];
    let b = this.getRandomNumber(100,1000);
    let d
    if(a<10){
      d = '0' + '0' + a.toString()
    } else if(10 <= a && a <100){
      d = '0' + a.toString()
    }
    let c = a + b
    let id =  b.toString() + c.toString() + d.toString() 
    console.log(id)

    const data = {
      _id: id,
      name: this.student.name,
      surrname: this.student.surrname,
      courses: this.student.courses
    };
    this.dataService.createStudent(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.getStudents();
        },
        error => {
          console.log(error);
        }
      );
  }
  getStudents(){
    this.dataService.getStudents()
      .subscribe(
        response => {
          this.students = response;
        }
      )
  }
  newStudent(){
    this.submitted = false;
    this.student = {
      _id: null,
      name: '',
      surrname: '',
      courses: []
    };
    this.getStudents();
  }
}
