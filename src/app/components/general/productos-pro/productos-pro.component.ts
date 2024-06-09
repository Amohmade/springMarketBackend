import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, CommonModule, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  precio_base: number;
  precio_venta: number;
  stock: number;
  cantidad: number;
}

@Component({
  selector: 'app-productos-pro',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule
  ],
  templateUrl: './productos-pro.component.html',
  styleUrl: './productos-pro.component.css'
})

export class ProductosProComponent implements OnInit {

  listaproductos: Producto[] = [];

  miform = new FormControl('');
  
  filteredOptions!: Observable<Producto[]>;

  selectedProducto: Producto | null = null;

  productos:any[]=[];

  subTotal!: any;

  proveedor: string | null = null;


  //Busqueda producto
  constructor(private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.proveedor = params.get('proveedor');
      if (this.proveedor) {
        this.fetchListaProductos(this.proveedor).subscribe(data => {
          this.listaproductos = data;
        });
        this.loadCarrito();
      }
    });

    this.filteredOptions = this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.productos = this.getProducto();
  }

  fetchListaProductos(proveedor:string): Observable<Producto[]> {
    const apiUrl = `api/productos?proveedor=${proveedor}`;
    return this.http.get<Producto[]>(apiUrl);
  }

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

  getProducto(){
    return this.productos;
  }

  saveCarrito(){
    if (this.proveedor) {
      localStorage.setItem(`carrito_${this.proveedor}`, JSON.stringify(this.productos));
    }
  }

  addProducto(producto: Producto) {
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
  
  updateSubTotal() {
    this.subTotal = this.productos.reduce((total, producto) => total + producto.precio_venta * producto.cantidad, 0);
  }

  updateCantidad(producto: Producto, cantidad: number) {
    const index = this.productos.findIndex((p) => p.id === producto.id);
    if (index > -1) {
      this.productos[index].cantidad = cantidad;
      if (this.productos[index].cantidad <= 0) {
        this.deleteProductoCarrito(producto);
      } else {
        this.saveCarrito();
        this.updateSubTotal();
      }
    }
  }

  loadCarrito(){
    if (this.proveedor) {
      this.productos = JSON.parse(localStorage.getItem(`carrito_${this.proveedor}`) as any) || [];
    }
  }

  productoCarrito(producto:any){
    return this.productos.findIndex((x:any)=> x.id === producto.id) > -1;
  }
  
  deleteProductoCarrito(producto:any){
    const index = this.productos.findIndex((x:any)=> x.id === producto.id);

    if(index > -1){
      this.productos.splice(index,1);
      this.saveCarrito()
    }
  }

  clearCarrito(){
    if (this.proveedor) {
      localStorage.removeItem(`carrito_${this.proveedor}`);
      this.productos = [];
      this.updateSubTotal();
    }
    
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + producto.precio_venta;
    }, 0);
  }
}
