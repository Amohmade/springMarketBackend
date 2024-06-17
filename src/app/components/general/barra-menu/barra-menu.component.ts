import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLinkActive, RouterModule } from '@angular/router';
// import { ServiciorolService } from '../../../serviciorol.service';

@Component({
  selector: 'app-barra-menu',
  standalone: true,
  imports: [
    RouterModule,
    RouterLinkActive,
    MatGridListModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './barra-menu.component.html',
  styleUrl: './barra-menu.component.css'
})
export class BarraMenuComponent implements OnInit {

  role:string = "";

  // constructor(private rol:ServiciorolService){}

  ngOnInit(): void {
    // this.role = this.rol.getRole() ?? "";
  }

  Iconos = [
    { nombre: 'Escanear', src: "barcode_scanner", roles: ['Establecimiento'] },
    { nombre: 'Productos', src: "grocery", roles: ['Establecimiento', 'Proveedor'] },
    { nombre: 'Estadisticas', src: "monitoring", roles: ['Establecimiento', 'Proveedor'] },
    { nombre: 'Proveedores', src: "patient_list", roles: ['Establecimiento'] }
  ];

  accionPorRol(): any[] {
    return this.Iconos.filter(icono => icono.roles.includes(this.role));
  }
}
