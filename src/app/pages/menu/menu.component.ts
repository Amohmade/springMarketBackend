import { Component,Output } from '@angular/core';
import { BarraMenuComponent } from '../../components/general/barra-menu/barra-menu.component';
import { RouterModule,RouterLink, RouterLinkActive, RouterOutlet  } from '@angular/router';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ServiciorolService } from '../../serviciorol.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    RouterOutlet,
    MatSidenavModule,
    RouterModule,
    RouterLinkActive,
    MatGridListModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  role:string = "";

  constructor(private rol:ServiciorolService){}

  ngOnInit(): void {
    this.role = this.rol.getRole() ?? "";
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
