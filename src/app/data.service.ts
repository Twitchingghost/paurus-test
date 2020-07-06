import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const studentsUrl = 'http://localhost:8080/api/students';
const proffesorsUrl = 'http://localhost:8080/api/proffesors';
const coursesUrl = 'http://localhost:8080/api/courses';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getStudents() {
    return this.http.get(studentsUrl);
  };

  getOneStudent(id) {
    return this.http.get(`${studentsUrl}/${id}`);
  };

  createStudent(data) {
    return this.http.post(studentsUrl, data);
  };

  updateStudent(id, data){
    return this.http.put(`${studentsUrl}/${id}`, data)
  };

  deleteStudent(id){
    return this.http.delete(`${studentsUrl}/${id}`);
  };

  deleteAllStudents(){
    return this.http.delete(studentsUrl)
  };

  getProffesors() {
    return this.http.get(proffesorsUrl);
  };
  
  getCourses(){
    return this.http.get(coursesUrl);
  };

  updateCourse(id, data){
    return this.http.put(`${coursesUrl}/${id}`, data);
  }
}
