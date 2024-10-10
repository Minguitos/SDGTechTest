import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-individual-view',
  templateUrl: './individual-view.component.html',
  styleUrls: ['./individual-view.component.scss'],
  imports: [CommonModule, SharedMaterialModule, RouterModule],
})
export class IndividualViewComponent implements OnInit {
  //Declaracion de variables y eventos.
  continents: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadContinents();
  }

  /**
   * @author Jorge Fernández Minguito
   * Carga todos los continentes utilizando el servicio `CountryService` y agrupa los países por continente.
   * Este método configura los datos iniciales necesarios para la vista del componente.
   *
   * @returns {void}
   */
  loadContinents(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.continents = this.groupByContinent(data);
    });
  }

  /**
   * @author Jorge Fernández Minguito
   * Agrupa países en sus respectivos continentes. También asigna una descripción y una imagen a cada continente.
   * Se usa para preparar los datos que se mostrarán en la interfaz de usuario.
   *
   * @param {any[]} countries - Array de objetos país que serán agrupados por continente.
   * @returns {any[]} Array de objetos continente agrupados, cada uno con sus países, descripción e imagen.
   */
  groupByContinent(countries: any[]): any[] {
    const grouped = countries.reduce((acc, country) => {
      let continent = country.region || 'Unknown';
      if (continent === 'Americas') {
        continent =
          country.subregion === 'North America'
            ? 'North America'
            : 'South America';
      }

      if (!acc[continent]) {
        acc[continent] = {
          name: continent,
          countries: [],
          description: this.countryService.getContinentDescription(continent),
          image: this.countryService.getContinentImage(continent),
        };
      }
      acc[continent].countries.push(country);
      return acc;
    }, {});

    return Object.keys(grouped).map((key) => ({
      name: grouped[key].name,
      countries: grouped[key].countries,
      description: grouped[key].description,
      image: grouped[key].image,
    }));
  }
}
