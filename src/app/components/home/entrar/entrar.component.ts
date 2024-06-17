import { Component } from '@angular/core';
import { HeaderComponent } from '../../general/header/header.component';
import { RouterOutlet } from '@angular/router';
import { UserheaderComponent } from '../../general/userheader/userheader.component';

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [
    UserheaderComponent,
    RouterOutlet
  ],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent {

}
