import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  firstFormGroup: FormGroup;
  user: User = new User();
  selectedFile: File;
  f: NgForm;
  myFile: File;
  constructor(public userService: UserService, private _snackBar: MatSnackBar, public http: HttpClient) { }
  private baseUrl = environment.apiBasePath;

  ngOnInit() {
    this.userService.getUserInfoByToken(localStorage.getItem('token')).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this._snackBar.open('No existe el usuario');
    });
  }


  onSelectFile(event) { // called each time file input changes
      this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(f: NgForm) {
    const fd = new FormData();
    fd.append('dni_image',  this.selectedFile, this.selectedFile.name);
    fd.append('_method', 'PUT');
    return this.http.post(`${this.baseUrl}/api/user/ ${this.user.id}` , fd).subscribe((res: User) =>{
      this.user = res;
    });
  }
}