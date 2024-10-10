import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared/shared-material.module';
import { MenuComponent } from './menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, SharedMaterialModule, MenuComponent],
})
export class AppComponent {
  //Declaracion de variables y eventos.
}
