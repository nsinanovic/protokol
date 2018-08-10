import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../users/user';
import { UserService } from '../users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User>;

  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data:  Array<User>) => {
      this.users = data;     
    });
  }
}
