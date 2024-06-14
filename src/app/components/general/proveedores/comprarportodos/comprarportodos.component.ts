import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, firstValueFrom} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {AsyncPipe, CommonModule, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiciorolService } from '../../../../serviciorol.service';

interface Producto {
  id: number;
  nombre: string;
  precioVenta: number;
  stock: number;
  cantidad: number;
}

@Component({
  selector: 'app-comprarportodos',
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
  templateUrl: './comprarportodos.component.html',
  styleUrl: './comprarportodos.component.css'
})
export class ComprarportodosComponent {

  listaproductos: Producto[] = [];
  filteredProductos: Producto[] = [];

  miform = new FormControl('');
  
  filteredOptions!: Observable<Producto[]>;

  selectedProducto: Producto | null = null;

  productos:any[]=[];

  subTotal!: any;

  role:string = "";
  id:string = "";

  constructor(
    private http: HttpClient,
    private serviciorol:ServiciorolService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  ngOnInit():void {
    this.fetchListaProductos().subscribe(data => {
      this.listaproductos = data;
      this.filteredProductos = data;
    });

    this.filteredOptions = this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.loadCarrito();
  }

  fetchListaProductos(): Observable<Producto[]> {
    const apiUrl = `http://localhost:8082/proveedores/productos`;
    return this.http.get<Producto[]>(apiUrl);
  }

  private _filter(value: string): Producto[] {
    const filterValue = value.trim().toLowerCase();
    this.filteredProductos = this.listaproductos.filter(producto =>
      producto.nombre.toLowerCase().includes(filterValue)
    );
    return this.filteredProductos;
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
    localStorage.setItem('carrito_todosproveedores',JSON.stringify(this.productos))
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

  loadCarrito() {
    this.productos = JSON.parse(localStorage.getItem('carrito_todosproveedores') as any) || [];
  }

  productoCarrito(producto: any) {
    return this.productos.findIndex((x: any) => x.id === producto.id) > -1;
  }
  
  deleteProductoCarrito(producto: Producto) {
    const index = this.productos.findIndex((p) => p.id === producto.id);
    if (index > -1) {
      this.productos.splice(index, 1);
      this.saveCarrito();
      this.updateSubTotal();
    }
  }

  clearCarrito() {
    localStorage.removeItem(`carrito_todosproveedores`);
    this.productos = [];
    this.updateSubTotal();
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + (producto.precioVenta * producto.cantidad);
    }, 0);
  }
  
  prepareCompraData(): any[] {
    return this.productos.map(producto => ({
      productoProveedorId: producto.id,
      cantidad: producto.cantidad
    }));
  }

  async realizarCompra(): Promise<void> {
    const compraData = this.prepareCompraData();
    const apiUrl = `http://localhost:8082/compras/${this.id}`;
    const comprasFallidas: Producto[] = [];

    for (const item of compraData) {
      try {
        await firstValueFrom(this.http.post(apiUrl, [item]));
        this._snackBar.open(`Compra realizada`, "OK");
      } catch (error: any) {
        const productoFallido = this.productos.find(p => p.id === item.productoProveedorId);
        if (productoFallido) {
          this._snackBar.open(`Quedan ${productoFallido.stock} unidades de ${productoFallido.nombre}`, "OK");
          comprasFallidas.push(productoFallido);
        }
      }
    }
    this.productos = comprasFallidas;
    
    this.saveCarrito();
    this.updateSubTotal();
    this.cdr.detectChanges();
  }
}
