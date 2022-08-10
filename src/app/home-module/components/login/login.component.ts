import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  contactFabButton: any;
  bodyelement: any;
  sidenavelement: any;

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;

  mobileQuery: MediaQueryList;
  showSpinner = true;
  myForm: FormGroup;
  walmartApp: any;
  inputsCount = 0;
  name: string;
  form: FormGroup;
  user: User = new User();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public loginService: UserService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    if (this.loginService.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '250px'
    });
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    });
  }

  submitForm() {
    if (this.form.valid){
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.loginService.login(this.user);
    }
  }
}
