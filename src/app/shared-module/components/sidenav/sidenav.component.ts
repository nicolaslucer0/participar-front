import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() public sidenavClose = new EventEmitter();

  isLogged: Boolean = false;
  user: User = new User();

  constructor(public loginService: UserService) {}

  ngOnInit() {
    this.isLogged = this.loginService.isLogged();
    this.user.dni = localStorage.getItem('user');
  }

  logout() {
    this.loginService.logout();
  }

  public onToggleSidenav = () => {
    this.sidenavClose .emit();
  }
}
