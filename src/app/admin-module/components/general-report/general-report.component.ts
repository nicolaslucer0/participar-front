import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ReportResponse } from 'src/app/models/report-response.model';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Proyecto } from 'src/app/models/laws.model';
import { LawService } from 'src/app/services/law.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoCompleteInput } from 'src/app/models/autocomplete.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories.service';
import { LocationService } from 'src/app/services/location.service';
import { Provincia } from 'src/app/models/provincia.model';
import { ReportFilters } from 'src/app/models/report-filters.model';
import { ParticipationIndexResponse } from 'src/app/models/ParticipationIndexResponse.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css']
})
export class GeneralReportComponent implements OnInit {
  proyectos: AutoCompleteInput[] = [];
  pieChartData: number[] = [];
  form: FormGroup;
  report: ReportResponse = new ReportResponse;
  categories: Category[] = [];
  filteredProyectos: Observable<AutoCompleteInput[]>;
  filteredProvincias: Observable<AutoCompleteInput[]>;
  provinciasJson: AutoCompleteInput[] = [];
  participationIndexResponse: ParticipationIndexResponse;
  constructor(
    public reportService: ReportService,
    public categoryService: CategoryService,
    private locationService: LocationService,
    public proyectoService: LawService,
    private spinner: NgxSpinnerService
  ) { }

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'top', },
    plugins: { datalabels: { formatter: (value, ctx) => { const label = ctx.chart.data.labels[ctx.dataIndex]; return label; }, }, }
  };
  pieChartLabels: Label[] = [['A favor'], ['En contra'], 'Abstencion'];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [{ backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'], }];


  // Bar chart data
  public barChartOptions: ChartOptions = {
    responsive: true, scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }, plugins: {
      datalabels: { anchor: 'end', align: 'end', }
    }
  };
  public barChartLabels: Label[] = ['Indice de participación'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  ngOnInit() {
    this.spinner.show();
    this.createForm();

    this.reportService.getDefaultStatictics(null).subscribe((report: ReportResponse) => {
      this.report = report;
      this.pieChartData = [this.report.aFavor, this.report.enContra, this.report.abstencion];
    });

    this.reportService.getParticipationIndex().subscribe((participationIndex: ParticipationIndexResponse) => {
      this.participationIndexResponse = participationIndex;
      this.barChartData = [
        { data: [this.participationIndexResponse.votaron], label: 'Usuarios que ya han votado' },
        { data: [this.participationIndexResponse.noVotaron], label: 'Usuarios que no votaron' }
      ];
      this.spinner.hide();
    });
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.proyectoService.getAll().subscribe((proyectos: Proyecto[]) => {
      this.proyectos = proyectos.map(proyecto => new AutoCompleteInput(proyecto.id.toString(), proyecto.titulo));
      this.filteredProyectos = this.form.get('proyecto').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name, this.proyectos) : this.proyectos.slice())
        );
    });

    this.locationService.getProvincias().subscribe((data: Provincia[]) => {
      this.provinciasJson = data.map(provincia => new AutoCompleteInput(provincia.id, provincia.nombre));
      this.filteredProvincias = this.form.get('provincia').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name, this.provinciasJson) : this.provinciasJson.slice())
        );
    });
  }

  private _filter(name: string, json: AutoCompleteInput[]): AutoCompleteInput[] {
    const filterValue = name.toLowerCase();

    return json.filter(option => option.nombre.toLowerCase().indexOf(filterValue) >= 0);
  }


  displayFn(user?: AutoCompleteInput): string | undefined {
    return user ? user.nombre : undefined;
  }

  filter() {
    const edadDesde = this.form.get('edadDesde').value;
    const edadHasta = this.form.get('edadHasta').value;
    const genero = this.form.get('genero').value;
    const proyecto = this.form.get('proyecto').value;
    const category = this.form.get('categoria').value;
    const provincia = this.form.get('provincia').value;
    const filters = new ReportFilters();
    if (!!edadDesde) { filters.edadDesde = edadDesde; }
    if (!!edadHasta) { filters.edadHasta = edadHasta; }
    if (!!genero) { filters.genero = genero; }
    if (!!proyecto) { filters.proyecto = proyecto.id; }
    if (!!category) { filters.category = category; }
    if (!!provincia) { filters.provincia = provincia.id; }

    this.reportService.getDefaultStatictics(filters).subscribe((report: ReportResponse) => {
      this.report = report;
      this.pieChartData = [this.report.aFavor, this.report.enContra, this.report.abstencion];
    });

  }

  clearFilters() {
    this.form.reset();
  }

  createForm() {
    this.form = new FormGroup({
      proyecto: new FormControl(),
      genero: new FormControl(),
      categoria: new FormControl(),
      provincia: new FormControl(),
      edadDesde: new FormControl(),
      edadHasta: new FormControl(),
    });
  }
}
