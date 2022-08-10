import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(public userService: UserService) { }
  dataSource: User[] = [];
  displayedColumns: string[] = ['dni', 'name', 'apellido', 'ver'];

  ngOnInit() {
    this.userService.getAllUnverifiedUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

}
