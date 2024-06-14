import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-funciones',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css'
})
export class FuncionesComponent {
  Ex1 = false;
  Ex2 = false;
  Ex3 = false;
  Ex4 = false;

  toggleAccordion(expandItem: string): void {
    if (expandItem === 'Ex1') {
      this.Ex1 = !this.Ex1;
    } else if (expandItem === 'Ex2') {
      this.Ex2 = !this.Ex2;
    } else if (expandItem === 'Ex3') {
      this.Ex3 = !this.Ex3;
    } else if (expandItem === 'Ex4') {
      this.Ex4 = !this.Ex4;
    }
  }
}
