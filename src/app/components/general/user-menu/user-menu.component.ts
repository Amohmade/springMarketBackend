import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserheaderComponent } from '../userheader/userheader.component';
import { BarraMenuComponent } from '../barra-menu/barra-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule,RouterLink, RouterLinkActive, RouterOutlet  } from '@angular/router';
import { EscanearComponent } from '../escanear/escanear.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    CommonModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

  @Input() role!: number;
  
  Acciones = [
    { nombre: 'Escanear', rol: 1},
    { nombre: 'Productos', rol: 2},
    { nombre: 'Estadisticas', rol: 2},
    { nombre: 'Proveedores', rol: 1},
    { nombre: 'Cuenta', rol: 2},
  ];

  accionPorRol(role: number): any[]{
    return this.Acciones.filter(accion => accion.rol >= role);
  }
}
