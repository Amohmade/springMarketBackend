import { Component } from '@angular/core';
import { BarraMenuComponent } from '../barra-menu/barra-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserheaderComponent } from '../userheader/userheader.component';

@Component({
  selector: 'app-escanear',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    MatButtonModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './escanear.component.html',
  styleUrl: './escanear.component.css'
})
export class EscanearComponent {

}
