import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared/shared-material.module';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [FormsModule, SharedMaterialModule],
})
export class FilterComponent {
  //Declaracion de variables y eventos.
  populationThreshold: number = 0;
  @Output() filterChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * @author Jorge Fernández Minguito
   * Emite un evento con el umbral actual de población para filtrar países.
   * Este método es llamado cuando el valor del umbral cambia en la interfaz de usuario CONSTANTEMENTE <-- Importante.
   *
   * @returns {void}
   */
  onFilterChange() {
    this.filterChange.emit(this.populationThreshold);
  }
}
