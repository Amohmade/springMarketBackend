import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from '../../../pages/user-menu/user-menu.component';

@Component({
  selector: 'app-barra-menu',
  standalone: true,
  imports: [RouterModule,MatGridListModule,MatButtonModule],
  templateUrl: './barra-menu.component.html',
  styleUrl: './barra-menu.component.css'
})
export class BarraMenuComponent {
  
}
