import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  id: number;
  user: User;
  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.findOneUserById(this.id).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }

  verificarUsuario() {
    this.spinner.show()
    this.userService.verifyUser(this.user.id).subscribe((user: User) => {
      this.router.navigate(['/admin/users']);
      this.spinner.hide();
    });
  }

  bloquarUsuario() {

  }

  public handleRefusalToSetEmail(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }
}
