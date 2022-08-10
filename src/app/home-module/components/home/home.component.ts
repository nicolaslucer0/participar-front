import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contactFabButton: any;
  bodyelement: any;

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;
  isLogged: Boolean = false;

  constructor(
    public dialog: MatDialog,
    public loginService: UserService
    ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '250px'
    });
  }

}
