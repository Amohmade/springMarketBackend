import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/home/header/header.component';
import { BannerComponent } from '../../components/home/banner/banner.component';
import { FuncionesComponent } from '../../components/home/funciones/funciones.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    FuncionesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
