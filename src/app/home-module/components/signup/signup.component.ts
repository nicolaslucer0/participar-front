import { Component, OnInit, Inject, ChangeDetectorRef, DebugElement } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { AutoCompleteInput } from 'src/app/models/autocomplete.model';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs';
import { Provincia } from 'src/app/models/provincia.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { EthcontractService } from 'src/app/services/ethcontract.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  contactFabButton: any;
  bodyelement: any;
  sidenavelement: any;

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;

  showSpinner = true;
  inputsCount = 0;
  name: string;
  form: FormGroup;
  isLinear = false;
  passwordMatch = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  provinciasJson: AutoCompleteInput[] = [];
  localidadesJson: AutoCompleteInput[] = [];
  municipiosJson: AutoCompleteInput[] = [];

  provinciaSelected: Provincia;
  localidadSelected: Provincia;

  filteredProvincias: Observable<AutoCompleteInput[]>;
  filteredLocalidades: Observable<AutoCompleteInput[]>;
  filteredMunicipios: Observable<AutoCompleteInput[]>;

  user: User = new User();

  constructor(
    @Inject(DOCUMENT) document,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private locationService: LocationService,
    private userService: UserService,
    public etherService: EthcontractService
  ) {
  }

  ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(['/']);
    }

    this.spinner.show();
    this.createForms();
    this.locationService.getProvincias().subscribe((data: Provincia[]) => {
      this.provinciasJson = data.map(provincia => new AutoCompleteInput(provincia.id, provincia.nombre));
      this.filteredProvincias = this.secondFormGroup.get('provincia').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name, this.provinciasJson) : this.provinciasJson.slice())
        );
      this.spinner.hide();
    });
  }
  private _filter(name: string, json: AutoCompleteInput[]): AutoCompleteInput[] {
    const filterValue = name.toLowerCase();

    return json.filter(option => option.nombre.toLowerCase().indexOf(filterValue) >= 0);
  }

  displayFn(user?: AutoCompleteInput): string | undefined {
    return user ? user.nombre : undefined;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '250px'
    });
  }

  private createForms() {
    this.firstFormGroup = new FormGroup({
      nombre: new FormControl(this.user.name, Validators.required),
      apellido: new FormControl(this.user.apellido, Validators.required),
      fechaNacimiento: new FormControl(this.user.fecha_nacimiento, [Validators.required, this.isOldEnough]),
      dni: new FormControl(this.user.dni, [Validators.required, Validators.pattern('[0-9]{8}')]),
      genero: new FormControl(this.user.genero, Validators.required)
    });

    this.secondFormGroup = new FormGroup({
      provincia: new FormControl(this.user.provincia, Validators.required),
      municipio: new FormControl(this.user.localidad_id, Validators.required),
      localidad: new FormControl(this.user.municipio_id, Validators.required)
    });

    this.thirdFormGroup = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required),
      secondPassword: new FormControl(this.user.password_confirmation, Validators.required)
    });
  }

  isOldEnough(c: FormControl) {
    const age = Math.abs(new Date(new Date().getTime() - c.value).getUTCFullYear() - 1970);
    if (age >= 16) {
      return null;
    } else {
      return {
        isOldEnough: true
        };
    }
  }

  passwordMatches() {
    const first = this.thirdFormGroup.get('password').value;
    const second = this.thirdFormGroup.get('secondPassword').value;
    if (first.localeCompare(second) === 0) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  submitForm() {
    this.spinner.show();
    this.buildUserInfo();
    // crear una nueva cuenta para web3
    // this.user.ether_address = web3.createAdress();
    this.userService.signup(this.user).subscribe((token: string) => {
      this._snackBar.open('Registrado con éxito', '¡Éxito!', {
        duration: 1000,
        panelClass: 'success-panel',
        politeness: 'polite'
      });
      this.spinner.hide();
      this.router.navigate(['/login']);
    }, error => {
      this.spinner.hide();
      this._snackBar.open(error.message, 'error');
    });

  }

  buildUserInfo() {
    this.user.apellido = this.firstFormGroup.get('apellido').value;
    this.user.name = this.firstFormGroup.get('nombre').value;
    this.user.dni = this.firstFormGroup.get('dni').value;
    this.user.genero = this.firstFormGroup.get('genero').value;
    this.user.fecha_nacimiento = this.firstFormGroup.get('fechaNacimiento').value.toISOString().split('T')[0];
    this.user.localidad_id = this.secondFormGroup.get('localidad').value.id;
    this.user.email = this.thirdFormGroup.get('email').value;
    this.user.password = this.thirdFormGroup.get('password').value;
    this.user.password_confirmation = this.thirdFormGroup.get('secondPassword').value;
  }

  selectProvincia(event) {
    this.spinner.show();
    this.provinciaSelected = event.option.value;
    this.locationService.getMunicipios(this.provinciaSelected).subscribe((municipios: Provincia[]) => {
      this.municipiosJson = municipios.map(
        municipio => new AutoCompleteInput(municipio.id, municipio.nombre)
      );
      this.filteredMunicipios = this.secondFormGroup.get('municipio').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name, this.municipiosJson) : this.municipiosJson.slice())
        );
      this.spinner.hide();
    });
  }

  selectLocalidad(event) {
    this.spinner.show();
    this.localidadSelected = event.option.value;
    this.locationService.getLocalidades(this.provinciaSelected, this.localidadSelected).subscribe((localidades: Provincia[]) => {
      this.localidadesJson = localidades.map(
        localidad => new AutoCompleteInput(localidad.id, localidad.nombre)
      );

      this.filteredLocalidades = this.secondFormGroup.get('localidad').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name, this.localidadesJson) : this.localidadesJson.slice())
        );
    });
    this.spinner.hide();
  }

}
