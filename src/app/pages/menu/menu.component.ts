import { Component } from '@angular/core';
import { BarraMenuComponent } from '../../components/general/barra-menu/barra-menu.component';
import { RouterModule,RouterLink, RouterLinkActive, RouterOutlet  } from '@angular/router';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    UserheaderComponent,
    BarraMenuComponent,
    RouterOutlet
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
