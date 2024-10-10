import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private countriesCache: any[] = [];

  constructor(private http: HttpClient) {}

  /**
   * @author Jorge Fernández Minguito
   * Recupera todos los países utilizando una API remota. Utiliza una caché para evitar peticiones repetidas.
   * Introduce un retardo para simular la carga de datos y actualizar el estado de carga.
   *
   * @returns {Observable<any[]>} Un Observable que emite la lista de países cargados.
   */
  getAllCountries(): Observable<any[]> {
    if (this.countriesCache.length > 0) {
      return new Observable((observer) => {
        observer.next(this.countriesCache);
        observer.complete();
      });
    }

    this.loadingSubject.next(true);
    return this.http.get<any[]>(this.apiUrl).pipe(
      delay(2000),
      tap((data) => {
        this.countriesCache = data;
        this.loadingSubject.next(false);
      })
    );
  }

  /**
   * @author Jorge Fernández Minguito
   * Agrupa los países por continente basándose en la región y subregión de cada país.
   * Esta función también acumula la población total de cada continente.
   *
   * @param {any[]} countries - Array de países a agrupar.
   * @returns {any[]} Array de objetos continente, cada uno con su nombre, lista de países y población total.
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
        acc[continent] = { name: continent, countries: [], population: 0 };
      }
      acc[continent].countries.push(country);
      acc[continent].population += country.population;
      return acc;
    }, {});
    return Object.keys(grouped).map((key) => ({
      name: grouped[key].name,
      countries: grouped[key].countries,
      population: grouped[key].population,
    }));
  }

  /**
   * @author Jorge Fernández Minguito
   * Proporciona una descripción textual para un continente dado.
   * Retorna una descripción predeterminada si el continente no está específicamente mapeado.
   *
   * @param {string} continent - Nombre del continente.
   * @returns {string} Descripción del continente.
   */
  getContinentDescription(continent: string): string {
    const descriptions: { [key: string]: string } = {
      Antarctic: 'Largest continent by both area and population.',
      Asia: 'Largest continent by both area and population.',
      Africa: 'Known for its diverse cultures and ecosystems.',
      'North America': 'Home to a variety of landscapes and climates.',
      'South America': 'Famous for the Amazon rainforest and Andes mountains.',
      Europe: 'Rich in history and cultural diversity.',
      Oceania: 'Includes many island nations and unique wildlife.',
    };
    return descriptions[continent] || 'Description not available';
  }

  /**
   * @author Jorge Fernández Minguito
   * Obtiene la URL de una imagen representativa para un continente dado.
   * Retorna una imagen por defecto si no hay una específica para el continente.
   *
   * @param {string} continent - Nombre del continente.
   * @returns {string} URL de la imagen del continente.
   */
  getContinentImage(continent: string): string {
    const images: { [key: string]: string } = {
      Antarctic: 'assets/images/antarctic-image.jpg',
      Asia: 'assets/images/asia-image.jpg',
      Africa: 'assets/images/africa-image.jpg',
      'North America': 'assets/images/north-america-image.jpg',
      'South America': 'assets/images/south-america-image.jpg',
      Europe: 'assets/images/europe-image.jpg',
      Oceania: 'assets/images/oceania-image.jpg',
    };
    return images[continent] || 'assets/images/default-image.jpg';
  }
}
