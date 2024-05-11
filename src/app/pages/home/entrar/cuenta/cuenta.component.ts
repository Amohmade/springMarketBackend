import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/general/header/header.component';
import { AccederComponent } from '../../../../components/home/entrar/acceder/acceder.component';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [HeaderComponent,AccederComponent],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {

}
