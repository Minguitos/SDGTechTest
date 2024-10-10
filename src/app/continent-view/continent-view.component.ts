import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';

@Component({
  standalone: true,
  selector: 'app-continent-view',
  templateUrl: './continent-view.component.html',
  styleUrls: ['./continent-view.component.scss'],
  imports: [
    CommonModule,
    SharedMaterialModule,
    HighchartsChartModule,
    FilterComponent,
  ],
})
export class ContinentViewComponent implements OnInit {
  //Declaracion de variables y eventos.
  continentName: string = '';
  countries: any[] = [];
  filteredCountries: any[] = [];
  chartOptions: Highcharts.Options = {};
  Highcharts: typeof Highcharts = Highcharts;
  loading: boolean = true;
  description: string | undefined;
  currentIndex: number = 0;
  continents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.continentName = params.get('id') || '';
      this.loadCountriesForContinent();
      this.description = this.countryService.getContinentDescription(
        this.continentName
      );
      this.currentIndex = this.continents.findIndex(
        (continent) => continent.name === this.continentName
      );
    });
  }

  /**
   * @author Jorge Fernández Minguito
   * Carga países del continente especificado utilizando el servicio `CountryService`.
   * Filtra países por continente y actualiza la lista de países y el gráfico asociado.
   *
   * @returns {void}
   */
  loadCountriesForContinent(): void {
    this.loading = true;
    this.countryService.getAllCountries().subscribe((data) => {
      this.continents = this.countryService.groupByContinent(data);
      this.countries = data.filter((country) => {
        let continent = country.region || 'Unknown';

        if (continent === 'Americas') {
          continent =
            country.subregion === 'North America'
              ? 'North America'
              : 'South America';
        }

        return continent === this.continentName;
      });

      this.filteredCountries = [...this.countries];
      this.updateChart();
      this.loading = false;
    });
  }

  /**
   * @author Jorge Fernández Minguito
   * Actualiza el gráfico de barras para mostrar la población de los países filtrados del continente.
   * Utiliza Highcharts para la visualización de datos.
   *
   * @returns {void}
   */
  updateChart(): void {
    const labels = this.filteredCountries.map((country) => country.name.common);
    const data = this.filteredCountries.map((country) => country.population);

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: `Population of Countries in ${this.continentName}`,
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
          type: 'column',
          data: data,
        },
      ],
    };
  }

  /**
   * @author Jorge Fernández Minguito
   * Filtra los países basándose en un umbral de población dado y actualiza el gráfico.
   *
   * @param {number} threshold Umbral de población para filtrar los países.
   * @returns {void}
   */
  onFilterChange(threshold: number): void {
    this.filteredCountries = this.countries.filter(
      (country) => country.population > threshold
    );
    this.updateChart();
  }

  /**
   * @author Jorge Fernández Minguito
   * Navega al siguiente continente en la lista de continentes disponibles.
   *
   * @returns {void}
   */
  goToNextContinent(): void {
    if (this.continents.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.continents.length;
      const nextContinent = this.continents[this.currentIndex].name;
      this.router.navigate(['/continent', nextContinent]);
    }
  }

  /**
   * @author Jorge Fernández Minguito
   * Navega al continente anterior en la lista de continentes disponibles.
   *
   * @returns {void}
   */
  goToPreviousContinent(): void {
    if (this.continents.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.continents.length) %
        this.continents.length;
      const prevContinent = this.continents[this.currentIndex].name;
      this.router.navigate(['/continent', prevContinent]);
    }
  }
}
