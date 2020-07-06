import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {

  proffesors: any

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getProffesors()
  }

  getProffesors(){
    this.dataService.getProffesors()
      .subscribe(
        response => {
          this.proffesors = response;
          console.log(response)
        }
      )
  }
  
}
