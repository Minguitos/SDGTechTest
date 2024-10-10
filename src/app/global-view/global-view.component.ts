import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { FilterComponent } from '../filter/filter.component';

@Component({
  standalone: true,
  selector: 'app-global-view',
  templateUrl: './global-view.component.html',
  styleUrls: ['./global-view.component.scss'],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    HighchartsChartModule,
    FilterComponent,
  ],
})
export class GlobalViewComponent implements OnInit {
  //Declaracion de variables y eventos.
  continents: any[] = [];
  filteredContinents: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  loading: boolean = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadContinents();

    this.countryService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  /**
   * @author Jorge Fernández Minguito
   * Carga los datos de todos los continentes utilizando el servicio `CountryService`.
   * Agrupa los países por continente y actualiza la lista de continentes filtrados y el gráfico asociado.
   *
   * @returns {void}
   */
  loadContinents(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.continents = this.countryService.groupByContinent(data);
      this.filteredContinents = [...this.continents];
      this.updateChart();
    });
  }

  /**
   * @author Jorge Fernández Minguito
   * Actualiza el gráfico de barras que muestra la población por continente.
   * Configura las opciones de Highcharts para visualizar los datos de población.
   *
   * @returns {void}
   */
  updateChart(): void {
    const labels = this.filteredContinents.map((continent) => continent.name);
    const data = this.filteredContinents.map(
      (continent) => continent.population
    );

    if (labels.length > 0 && data.length > 0) {
      this.chartOptions = {
        chart: {
          type: 'bar',
          height: 400,
        },
        title: {
          text: 'World Population by Continent',
        },
        xAxis: {
          categories: labels,
        },
        yAxis: {
          title: {
            text: 'Population',
          },
        },
        series: [
          {
            name: 'Population',
            type: 'bar',
            data: data,
          },
        ],
      };
    }
  }

  /**
   * @author Jorge Fernández Minguito
   * Filtra los continentes basándose en un umbral de población dado y actualiza el gráfico.
   *
   * @param {number} threshold Umbral de población para filtrar los continentes.
   * @returns {void}
   */
  onFilterChange(threshold: number): void {
    this.filteredContinents = this.continents.filter(
      (continent) => continent.population > threshold
    );
    this.updateChart();
  }
}
