import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  Proveedores = [{
    "id": 1,
    "nombre": "Jaxnation",
    "num_productos": 789
  }, {
    "id": 2,
    "nombre": "Edgepulse",
    "num_productos": 752
  }, {
    "id": 3,
    "nombre": "Kanoodle",
    "num_productos": 731
  }, {
    "id": 4,
    "nombre": "Youbridge",
    "num_productos": 45
  }, {
    "id": 5,
    "nombre": "Shuffletag",
    "num_productos": 92
  }, {
    "id": 6,
    "nombre": "Thoughtworks",
    "num_productos": 916
  }, {
    "id": 7,
    "nombre": "Mudo",
    "num_productos": 744
  }, {
    "id": 8,
    "nombre": "Vitz",
    "num_productos": 176
  }, {
    "id": 9,
    "nombre": "Geba",
    "num_productos": 259
  }, {
    "id": 10,
    "nombre": "Vinte",
    "num_productos": 973
  }]
}
