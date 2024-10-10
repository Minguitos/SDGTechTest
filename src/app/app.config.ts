/**
 * Configura servicios esenciales para la aplicación Angular, incluyendo el router, cliente HTTP y animaciones.
 * Establece rutas para manejar la navegación entre vistas y componentes basados en URL específicas.
 * Implementa un sistema de interceptores para el manejo centralizado de peticiones HTTP.
 *
 * @fileoverview Configuración global de la aplicación Angular.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { GlobalViewComponent } from './global-view/global-view.component';
import { ContinentViewComponent } from './continent-view/continent-view.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IndividualViewComponent } from './individual-view/individual-view.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      [
        { path: '', component: GlobalViewComponent, pathMatch: 'full' },
        { path: 'continent/:id', component: ContinentViewComponent },
        { path: 'individual', component: IndividualViewComponent },
        { path: '**', redirectTo: '' },
      ],
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
