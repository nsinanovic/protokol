import { Component, OnInit } from '@angular/core';
import { Password } from './password';
import { PasswordsService } from './passwords.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {
  passwords: Array<Password>;
  keyword: string;
  all: Array<Password>;

  constructor(private passwordsService: PasswordsService) { }

  ngOnInit() {
    this.passwordsService.getPasswords().subscribe((data: Array<Password>) => {
      this.passwords = data;
      this.all = data;
    });
  }

  search() {
    if (!this.keyword) {
      this.passwords = this.all;
    }
    else {
      var search = this.keyword;
      this.passwords = this.all.filter(function (o) {
        return Object.keys(o).some(function (k) {
          return o[k].toString().toLowerCase().indexOf(search) != -1;
        })
      })
    }
  }
}
