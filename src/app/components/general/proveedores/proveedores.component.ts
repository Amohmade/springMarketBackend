import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient ,HttpClientModule } from '@angular/common/http';

interface Proveedor {
  id: number;
  email: string;
  empresa: string;
  telefono: number;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  proveedores: Proveedor[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  fetchProveedores(): Observable<Proveedor[]> {
    // Replace with your actual API URL
    const apiUrl = 'api/proveedores';
    return this.http.get<Proveedor[]>(apiUrl);
  }
}
