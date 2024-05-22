import { Component } from '@angular/core';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import { BannerComponent } from '../../components/home/banner/banner.component';
import { BarraMenuComponent } from '../../components/general/barra-menu/barra-menu.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

  Empleados = [{
    nombre: "Brande",rol : 2
  }, 
  {
    nombre: "Jordon",rol: 3
  }, 
  {
    nombre: "Mil",rol: 3
  }, 
  {
    nombre: "Trev",rol: 3
  }, 
  {
    nombre: "Paolina",rol: 2
  }]

}
