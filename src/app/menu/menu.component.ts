import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../shared/shared-material.module';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CommonModule, MatListModule, RouterModule, SharedMaterialModule],
})
export class MenuComponent {
  //Declaracion de variables y eventos.
}
