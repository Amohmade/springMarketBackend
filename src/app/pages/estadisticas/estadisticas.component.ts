import { Component } from '@angular/core';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import { BarraMenuComponent } from '../../components/general/barra-menu/barra-menu.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    CommonModule,
    MatGridListModule
  ],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  
  Topventas = [
    {nombre:"Pan",unidades:2000},
    {nombre:"Coca Cola",unidades:1500},
    {nombre:"Pan",unidades:1000}
  ]

}
