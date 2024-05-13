import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import { BarraMenuComponent } from '../../components/general/barra-menu/barra-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    CommonModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  Acciones = [
    { nombre: 'Escanear', rol: 3 },
    { nombre: 'Productos', rol: 1 },
    { nombre: 'Estadísticas', rol: 2 },
    { nombre: 'Empleados', rol: 1 },
    { nombre: 'Pedidos', rol: 3 },
    { nombre: 'Proveedores', rol: 1 }
  ];

  accionPorRol(rol: number): any[]{
    return this.Acciones.filter(accion => accion.rol >= rol);
  }
}
