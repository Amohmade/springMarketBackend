import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatGridListModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ){}

  getUrl(){
    if(this.authService.isLoggedIn()){
      return "/Menu/Cuenta"
    }else{
      return "/Cuenta"
    }
  }
}
