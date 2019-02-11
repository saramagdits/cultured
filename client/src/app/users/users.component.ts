import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private usersService: UsersService) { }

  ngOnInit() {
  }
  onGetAllUsers() {
    // This will return an observable
    this.usersService.getAllUsers()
    // .subscribe((data) => { this.recipes = {data}; });
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onGetUserById() {
    this.usersService.getUserById(100)
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onCreateNewUser() {
    const user = {
      username: 'ngusername',
      password: 'ngpassword',
      avatar: null
    };
    // Will return 400 error bad request if you try to create a user while having authorization headers
    this.usersService.createNewUser(user)
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
}
