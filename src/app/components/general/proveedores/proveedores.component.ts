import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: number;
  correo: string;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit{
  proveedores: Proveedor[] = [];
  filteredProveedores: Proveedor[] = [];
  // listaproductos: Producto[] = [];
  miform = new FormControl('');
  // filteredOptions!: Observable<Producto[]>;
  // selectedProducto: Producto | null = null;
  role:string = "";
  id:string = "";

  constructor(
    private http: HttpClient,
    private authService:AuthService
  ){
  }

  ngOnInit(): void {
    this.fetchProveedores().subscribe(data => {
      this.proveedores = data;
      this.filteredProveedores = data;

    });

    this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    ).subscribe(filtered => {
      this.filteredProveedores = filtered;
    });
  }

  //Apis

  fetchProveedores(): Observable<Proveedor[]> {
    const apiUrl = 'http://localhost:8082/proveedores';
    return this.http.get<Proveedor[]>(apiUrl);
  }

  //Busqueda

  private _filter(value: string): Proveedor[] {
    const filterValue = value.trim().toLowerCase();
    return this.proveedores.filter(producto => 
      producto.nombre.toLowerCase().includes(filterValue)
    );
  }
}
