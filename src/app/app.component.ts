import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SpringMarket';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.redireccionar();
  }
  
  redireccionar(){
    if (this.authService.isLoggedIn()){
      this.authService.getRol().subscribe({
        next:(data)=> {
          if(data == 'ESTABLECIMIENTO'){
            this.router.navigate(['/Menu']);
          }else if(data == 'PROVEEDOR'){
            this.router.navigate(['/Menu/Productos']);
          }
        }
      });
    }
  }
}
