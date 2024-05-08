import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { PreciosComponent } from '../../components/precios/precios.component';
import { FuncionesComponent } from '../../components/funciones/funciones.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,BannerComponent,PreciosComponent,FuncionesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
