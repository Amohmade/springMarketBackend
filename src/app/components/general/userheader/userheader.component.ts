import { Component,Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userheader',
  standalone: true,
  imports: [RouterModule,MatGridListModule,MatButtonModule],
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css'
})

export class UserheaderComponent {

   @Input() rol: string = '1';

  notificaciones(){
    alert("No tienes notificaciones");
  }

  isProveedor(): boolean {
    return this.rol === 'proveedor';
  }

  isEstablecimiento(): boolean {
    return this.rol === 'establecimiento';
  }
}
