import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/general/header/header.component';
import { RegistroComponent } from '../../../../components/home/entrar/registro/registro.component';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [HeaderComponent,RegistroComponent],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

}
