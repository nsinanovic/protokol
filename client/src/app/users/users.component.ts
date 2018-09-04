import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User>;
  newUser: User;
  constructor(private usersService: UsersService) {
    this.newUser = new User;
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: Array<User>) => {
      this.users = data;
    });
  }

  public onFileChanged(event: any) {
    this.newUser.picture = event.target.files[0];   
  }
}
