import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-escanear',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './escanear.component.html',
  styleUrl: './escanear.component.css'
})
export class EscanearComponent {

}
