import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  cuurentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { 
    this.cuurentUserSubscription =
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }
  ngOnDestroy(){
    this.cuurentUserSubscription.unsubscribe();
  }
  deleteUser(id: number){
    this.userService.delete(id).pipe(first()).subscribe(users => {
      this.loadAllUsers()
    });
  }
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users
    })
  }

}
