import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-menu',
  standalone: true,
  imports: [
    RouterModule,
    RouterLinkActive,
    MatGridListModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './barra-menu.component.html',
  styleUrl: './barra-menu.component.css'
})
export class BarraMenuComponent {

  @Input() role!: number;

  Iconos = [
    { nombre: 'Escanear', src: "barcode_scanner", rol: 1},
    { nombre: 'Productos', src: "grocery", rol: 2},
    { nombre: 'Estadisticas', src: "monitoring", rol: 2},
    { nombre: 'Proveedores', src: "patient_list", rol: 1}
  ];

  accionPorRol(role: number): any[]{
    return this.Iconos.filter(icono => icono.rol >= role);
  }
}
