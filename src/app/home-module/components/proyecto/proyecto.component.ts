import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Proyecto } from 'src/app/models/laws.model';
import { LawService } from 'src/app/services/law.service';
import { ActivatedRoute } from '@angular/router';
import { VotacionService } from 'src/app/services/votacion.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { EthcontractService } from 'src/app/services/ethcontract.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyecto: Proyecto = new Proyecto;
  id: string;
  panelOpenState = false;
  user: User = new User;
  isLogged: Boolean;
  public barChartLabels: Label[] = ['Votos'];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Positivos' },
    { data: [0], label: 'Negativos' },
    { data: [0], label: 'Abstencion' },
  ];

  constructor(
    public lawService: LawService,
    public ethcontractService: EthcontractService,
    private route: ActivatedRoute,
    public votacionService: VotacionService,
    public spinner: NgxSpinnerService,
    public userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.lawService.getOneById(this.id).subscribe((proyecto: Proyecto) => {
      this.proyecto = proyecto;
      if (!this.proyecto.canVote) {
        this.buildChart();
      }
      this.spinner.hide();
    });

    if (this.userService.isLogged()) {
      this.isLogged = true;
      this.user.id = +localStorage.getItem('user');
    }
  }

  public handleRefusalToSetEmail(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  votar(accion: string) {
    this.spinner.show();
    switch (accion) {
      case 'A favor':
        // votamos por backend
        this.votacionService.votar(this.user.id, this.proyecto.id, accion).subscribe((proyecto: Proyecto) => {
          console.log('voté ok');
          this.proyecto = proyecto;
          this.buildChart();
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this._snackBar.open('Ya ha votado este artículo', 'Error', {
            duration: 1000,
            panelClass: 'error-panel',
            politeness: 'polite'
          });
          console.log('falló');
        });

        this.ethcontractService.Participar.votarAFavor(this.proyecto.id);

        break;
      case 'En contra':
        this.votacionService.votar(this.user.id, this.proyecto.id, accion).subscribe((proyecto: Proyecto) => {
          console.log('voté ok');
          this.proyecto = proyecto;
          this.buildChart();
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log('falló');
        });

        this.ethcontractService.Participar.votarEnContra(this.proyecto.id);

        break;
      case 'abstencion':
        this.votacionService.votar(this.user.id, this.proyecto.id, accion).subscribe((proyecto: Proyecto) => {
          console.log('voté ok');
          this.proyecto = proyecto;
          this.buildChart();
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log('falló');
        });
        this.ethcontractService.Participar.votarNeutro(this.proyecto.id);
    }
  }

  votarArticulo(numeroArticulo: number, accion: string) {
    this.spinner.show();
    switch (accion) {
      case 'A favor':
        // votamos por backend
        this.votacionService.votarArticulo(this.user.id, this.proyecto.id, numeroArticulo, accion).subscribe((proyecto: Proyecto) => {
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.proyecto = proyecto;
          this.spinner.hide();
        }, error => {
          this._snackBar.open('Ya ha votado este artículo', 'Error', {
            duration: 1000,
            panelClass: 'error-panel',
            politeness: 'polite'
          }); this.spinner.hide();
        });
        break;
      case 'En contra':
        this.votacionService.votarArticulo(this.user.id, this.proyecto.id, numeroArticulo, accion).subscribe((proyecto: Proyecto) => {
          this.proyecto = proyecto;
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.spinner.hide();
        }, error => {
          this._snackBar.open('Ya ha votado este artículo', 'Error', {
            duration: 1000,
            panelClass: 'error-panel',
            politeness: 'polite'
          }); this.spinner.hide();
        });
        break;
      case 'abstencion':
        this.votacionService.votarArticulo(this.user.id, this.proyecto.id, numeroArticulo, accion).subscribe(data => {
          this._snackBar.open('Voto insertado correctamente', '¡Éxito!', {
            duration: 1000,
            panelClass: 'success-panel',
            politeness: 'polite'
          });
          this.spinner.hide();
        }, error => {
          this._snackBar.open('Ya ha votado este artículo', 'Error', {
            duration: 1000,
            panelClass: 'error-panel',
            politeness: 'polite'
          });

          this.spinner.hide();
        });
    }
  }

  buildChart() {
    this.barChartData = [
      { data: [this.proyecto.positivo], label: 'Positivos', backgroundColor: '#2bbd7e', hoverBackgroundColor: '#2bbd7e73' },
      { data: [this.proyecto.negativo], label: 'Negativos', backgroundColor: '#c62828', hoverBackgroundColor: '#c6282887' },
      { data: [this.proyecto.abstencion], label: 'Abstencion', backgroundColor: '#fdd835' },
    ];
  }

  cargarProyecto() {
    let y = this.ethcontractService.Participar.cargarProyecto(1);
    console.dir(y);
  }
}
