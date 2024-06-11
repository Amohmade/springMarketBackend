import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiciorolService } from './serviciorol.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ManageDB';
  role: string | null = null;
  id: string | null = null;

  constructor(private serviciorol: ServiciorolService) {}

  ngOnInit(): void {
    // this.serviciorol.setRole('Proveedor');
    this.serviciorol.setRole('Establecimiento');
    this.serviciorol.setId('1');
    

    this.role = this.serviciorol.getRole();
    this.id = this.serviciorol.getId();

    console.log('Role from local storage:', this.role);
    console.log('Id from local storage:', this.id);
  }
}
