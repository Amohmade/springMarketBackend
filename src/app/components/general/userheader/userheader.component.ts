import { Component,EventEmitter,Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userheader',
  standalone: true,
  imports: [
    RouterModule,
    MatGridListModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css'
})

export class UserheaderComponent {
  
  @Output() open = new EventEmitter<void>();

  @Input() rol: string = '1';
  @Input() isOpen = true;

  enviarClick() {
    this.open.emit();
  }

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
