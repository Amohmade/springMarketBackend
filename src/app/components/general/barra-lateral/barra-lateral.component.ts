import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterModule,MatGridListModule,MatButtonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})
export class BarraLateralComponent {

}
