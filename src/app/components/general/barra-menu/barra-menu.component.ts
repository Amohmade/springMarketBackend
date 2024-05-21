import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatGridListModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './barra-menu.component.html',
  styleUrl: './barra-menu.component.css'
})
export class BarraMenuComponent {
  @Input() rol=0;

  Iconos = [
    { nombre: 'Escanear', src: "barcode_scanner"},
    { nombre: 'Productos', src: "list"},
    { nombre: 'Estadísticas', src: "monitoring"},
    { nombre: 'Empleados', src: "groups"},
  ];

  iconosPorRol(rol:number){
    if(rol==1){
      return 3;
    }else{
      return 1;
    }
  }
}
