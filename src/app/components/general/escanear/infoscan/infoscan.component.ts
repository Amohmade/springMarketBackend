import { Component } from '@angular/core';
import { BarraMenuComponent } from '../../barra-menu/barra-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserheaderComponent } from '../../userheader/userheader.component';

@Component({
  selector: 'app-infoscan',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './infoscan.component.html',
  styleUrl: './infoscan.component.css'
})
export class InfoscanComponent {

}
