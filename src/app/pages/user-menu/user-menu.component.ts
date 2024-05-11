import { Component } from '@angular/core';
import { UserheaderComponent } from '../../components/general/userheader/userheader.component';
import { BarraLateralComponent } from '../../components/general/barra-lateral/barra-lateral.component';
import { ContenidoComponent } from '../../components/general/contenido/contenido.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [UserheaderComponent,BarraLateralComponent,ContenidoComponent],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

}
