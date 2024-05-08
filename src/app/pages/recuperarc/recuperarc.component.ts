import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RecuperarComponent } from '../../components/recuperar/recuperar.component';

@Component({
  selector: 'app-recuperarc',
  standalone: true,
  imports: [HeaderComponent,RecuperarComponent],
  templateUrl: './recuperarc.component.html',
  styleUrl: './recuperarc.component.css'
})
export class RecuperarcComponent {

}
