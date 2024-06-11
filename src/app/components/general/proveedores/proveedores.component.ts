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
import { ServiciorolService } from '../../../serviciorol.service';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TodosproductosComponent } from './todosproductos/todosproductos.component';

interface Proveedor {
  id: number;
  email: string;
  nombre: string;
  telefono: number;
}

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_coste: number;
  precioVenta: number;
  cantidad: number;
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
    MatButtonModule,
    TodosproductosComponent,
    MatDialogModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit{
  proveedores: Proveedor[] = [];
  listaproductos: Producto[] = [];
  miform = new FormControl('');
  filteredOptions!: Observable<Producto[]>;
  selectedProducto: Producto | null = null;
  productos:any[]=[];
  subTotal!: any;
  role:string = "";
  id:string = "";

  constructor(private http: HttpClient,public dialog: MatDialog,private serviciorol: ServiciorolService){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  ngOnInit(): void {
    this.fetchProveedores().subscribe(data => {
      this.proveedores = data;
    });

    this.fetchListaProductos().subscribe(data => {
      this.listaproductos = data;
      this.loadCarrito();
    });

    this.filteredOptions = this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  //Apis

  fetchProveedores(): Observable<Proveedor[]> {
    const apiUrl = 'http://localhost:8082/proveedores';
    return this.http.get<Proveedor[]>(apiUrl);
  }

  fetchListaProductos(): Observable<Producto[]> {
    const apiUrl = `http://localhost:8082/proveedores/productos`;
    return this.http.get<Producto[]>(apiUrl);
  }

  //Busqueda

  private _filter(value: string): Producto[] {
    const filterValue = value === 'string' ? value.toLowerCase() : value.toString();
    return this.listaproductos.filter(producto => 
      producto.nombre.toString().includes(filterValue)
    );
  }

  onOptionSelected(event: any): void {
    const seleccionado = event.option.value;
    this.selectedProducto = this.listaproductos.find(producto => (producto.id === seleccionado)||(producto.nombre === seleccionado)) || null;
  }

  //Funciones carrito

  addProducto(producto: any){
    const index = this.productos.findIndex((p) => p.id === producto.id);
    if (index > -1) {
      this.productos[index].cantidad += 1;
    } else {
      producto.cantidad = 1;
      this.productos.push(producto);
    }
    this.saveCarrito();
    this.updateSubTotal();
  }

  saveCarrito(){
    localStorage.setItem('carrito_todosproveedores',JSON.stringify(this.productos))
  }

  updateSubTotal() {
    this.subTotal = this.productos.reduce((total, producto) => total + producto.precio_venta * producto.cantidad, 0);
  }

  loadCarrito(){
    this.productos = JSON.parse(localStorage.getItem('carrito_todosproveedores') as any) || [];
  }

  abrirCarrito(): void {
    const dialogRef = this.dialog.open(TodosproductosComponent, {
      width: '700px',
      data: { productos: this.productos }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCarrito();
    });
  }
}
