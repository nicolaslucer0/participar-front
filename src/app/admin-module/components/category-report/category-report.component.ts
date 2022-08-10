import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { AutoCompleteInput } from 'src/app/models/autocomplete.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportResponse } from 'src/app/models/report-response.model';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { ParticipationIndexResponse } from 'src/app/models/ParticipationIndexResponse.model';
import { ReportService } from 'src/app/services/report.service';
import { CategoryService } from 'src/app/services/categories.service';
import { LocationService } from 'src/app/services/location.service';
import { LawService } from 'src/app/services/law.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportFilters } from 'src/app/models/report-filters.model';
import { Proyecto } from 'src/app/models/laws.model';
import { startWith, map } from 'rxjs/operators';
import { Provincia } from 'src/app/models/provincia.model';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css']
})
export class CategoryReportComponent implements OnInit {
  proyectos: AutoCompleteInput[] = [];
  pieChartData: number[] = [];
  form: FormGroup;
  report: ReportResponse[] = [];
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

  public barChartData: ChartDataSets[] = [{ data: [0], label: 'holis' }];

  ngOnInit() {
    this.spinner.show();
    this.createForm();

    this.reportService.getReportByCategories(null).subscribe((report: ReportResponse[]) => {
      let positivos = [];
      let negativos = [];
      let abstencion = [];
      report.forEach(rep => {
        positivos.push(rep.aFavor);
        negativos.push(rep.enContra);
        abstencion.push(rep.abstencion);
      });
      this.barChartData = [
        {data: positivos, label : 'A favor', backgroundColor: '#4CAF50', hoverBackgroundColor: '#81C784'},
        {data: negativos, label : 'En contra', backgroundColor: '#D32F2F', hoverBackgroundColor: '#EF5350'},
        {data: abstencion, label : 'Abstencion', backgroundColor: '#FFC107', hoverBackgroundColor: '#FFEB3B'}
      ]
      this.barChartLabels = report.map(rep => {
        return [rep.nombre];
      });
      this.spinner.hide();
    });
  }
  filter() {
    const fechaDesde = this.form.get('fechaDesde').value;
    const fechaHasta = this.form.get('fechaHasta').value;
    const filters = new ReportFilters();
    if (!!fechaDesde) {
      filters.fechaDesde = fechaDesde.getFullYear() + '-' + (fechaDesde.getMonth() + 1) + '-' + fechaDesde.getDate();
    }
    if (!!fechaHasta) { filters.fechaHasta = fechaHasta.getFullYear() + '-' + (fechaHasta.getMonth() + 1) + '-' + fechaHasta.getDate(); }

    this.reportService.getReportByCategories(filters).subscribe((report: ReportResponse[]) => {
      let positivos = [];
      let negativos = [];
      let abstencion = [];
      report.forEach(rep => {
        positivos.push(rep.aFavor);
        negativos.push(rep.enContra);
        abstencion.push(rep.abstencion);
      });
      this.barChartData = [
        {data: positivos, label : 'A favor', backgroundColor: '#4CAF50', hoverBackgroundColor: '#81C784'},
        {data: negativos, label : 'En contra', backgroundColor: '#D32F2F', hoverBackgroundColor: '#EF5350'},
        {data: abstencion, label : 'Abstencion', backgroundColor: '#FFC107', hoverBackgroundColor: '#FFEB3B'}
      ]
      this.barChartLabels = report.map(rep => {
        return [rep.nombre];
      });
      this.spinner.hide();
    });

  }

  clearFilters() {
    this.form.reset();
  }

  createForm() {
    this.form = new FormGroup({
      fechaDesde: new FormControl(),
      fechaHasta: new FormControl(),
    });
  }
}
