import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  isLoggedIn = false;
  isRoleAdmin = false;

  isLogged: Boolean = this.isLoggedIn;
  isAdmin: Boolean = this.isRoleAdmin;
  user: User = new User();

  constructor(public loginService: UserService) { }

  ngOnInit() {
    this.isLogged = this.loginService.isLogged();
    this.isAdmin = this.loginService.isAdmin();
    this.user.dni = localStorage.getItem('user');
    this.loginService.isLoggedIn.subscribe((data: Boolean) => {
      this.isLogged = data;
    });

    this.loginService.isRoleAdmin.subscribe((data: Boolean) => {
      this.isAdmin = data;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.loginService.logout();
    this.isLogged = this.loginService.isLogged();
  }
}
