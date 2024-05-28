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

  Iconos = [
    { nombre: 'Escanear', src: "barcode_scanner"},
    { nombre: 'Productos', src: "grocery"},
    { nombre: 'Estadisticas', src: "monitoring"},
    { nombre: 'Proveedores', src: "patient_list"}
  ];
  
}
