/**
 * Configura las rutas principales para la aplicación Angular, especificando qué componentes se cargan para cada URL.
 * Facilita la navegación dentro de la aplicación y asegura que los componentes correctos sean renderizados según la ruta accesada.
 *
 * @fileoverview Definición de las rutas principales y su manejo dentro de la aplicación Angular.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GlobalViewComponent } from './global-view/global-view.component';
import { ContinentViewComponent } from './continent-view/continent-view.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: GlobalViewComponent, pathMatch: 'full' },
      { path: 'continent/:id', component: ContinentViewComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
};
