import { Component,OnInit,Output } from '@angular/core';
import { RouterModule,RouterLink, RouterLinkActive, RouterOutlet  } from '@angular/router';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  contrasena:string;
  rol: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    UserheaderComponent,
    RouterOutlet,
    MatListModule,
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
export class MenuComponent implements OnInit {
  isOpen=true;
  role:string = "";

  Iconos = [
    { nombre: 'Escanear', src: "barcode_scanner", roles: ['ESTABLECIMIENTO'] },
    { nombre: 'Productos', src: "grocery", roles: ['ESTABLECIMIENTO', 'PROVEEDOR'] },
    { nombre: 'Estadisticas', src: "monitoring", roles: ['ESTABLECIMIENTO', 'PROVEEDOR'] },
    { nombre: 'Proveedores', src: "patient_list", roles: ['ESTABLECIMIENTO'] }
  ];

  constructor(
    private authService:AuthService
  ){}

  ngOnInit(): void {
    this.authService.getRol().subscribe({
      next:(role) => {
        this.role = role;
      }
    });
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  accionPorRol(): any[] {
    return this.Iconos.filter(icono => icono.roles.includes(this.role));
  }
}
