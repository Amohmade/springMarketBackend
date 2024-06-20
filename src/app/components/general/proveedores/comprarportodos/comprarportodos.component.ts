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
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

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
    MatDividerModule,
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

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){
  }

  ngOnInit():void {
    this.fetchListaProductos().subscribe(data => {
      this.listaproductos = data;
      this.filteredProductos = data;
      this.filteredOptions = this.miform.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    this.loadCarrito();
  }

  fetchListaProductos(): Observable<Producto[]> {
    const apiUrl = 'proveedores/allProductos';
    return this.authService.getWithToken<Producto[]>(apiUrl).pipe(
      map((productos: Producto[]) => productos.filter(producto => producto.stock > 0))
    );
  }

  private _filter(value: string): Producto[] {
    const filterValue = value.trim().toLowerCase();
    this.filteredProductos = this.listaproductos.filter(producto =>
      producto.nombre.toLowerCase().includes(filterValue) && producto.stock > 0
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

  onCantidadChange(producto: Producto) {
    const cantidad = Number(producto.cantidad);
    if (isNaN(cantidad) || cantidad < 1) {
      this._snackBar.open(`La cantidad debe ser un número positivo`, 'OK', { duration: 3000 });
      producto.cantidad = 1;
    }
    this.updateCantidad(producto, cantidad);
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
    const apiUrl = `establecimientos/compras`;
    const comprasFallidas: Producto[] = [];
    const productosNoOrdenados: string[] = [];
    let comprasExitosas = 0;
  
    for (const item of compraData) {
      try {
        const response: any = await firstValueFrom(this.authService.postWithToken(apiUrl, [item]));
  
        if (typeof response === 'string' && response.includes('Stock insuficiente')) {
          const insufficientStockMessages = response.split('\n');
          insufficientStockMessages.forEach((msg: string) => {
            const match = msg.match(/producto:\s(\d+)/);
            if (match) {
              const productoId = parseInt(match[1], 10);
              const productoFallido = this.productos.find(p => p.id === productoId);
              if (productoFallido) {
                productosNoOrdenados.push(productoFallido.nombre);
                comprasFallidas.push(productoFallido);
              }
            }
          });
        } else {
          comprasExitosas++;
          const producto = this.productos.find(p => p.id === item.productoProveedorId);
          if (producto) {
            producto.stock -= producto.cantidad;
          }
        }
      } catch (error: any) {
        const productoFallido = this.productos.find(p => p.id === item.productoProveedorId);
        if (productoFallido) {
          productosNoOrdenados.push(productoFallido.nombre);
          comprasFallidas.push(productoFallido);
        }
      }
    }
  
    this.productos = this.productos.filter(producto => comprasFallidas.includes(producto));
  
    if (productosNoOrdenados.length > 0) {
      this._snackBar.open(`Stock insuficiente para los productos: ${productosNoOrdenados.join(', ')}`, "OK", { duration: 3000 });
    }

    if (comprasExitosas > 0 && productosNoOrdenados.length == 0) {
      this._snackBar.open(`${comprasExitosas} compras realizadas con éxito`, "OK", { duration: 2000 });
    }else if(comprasExitosas > 0){
      setTimeout(() => {
        this._snackBar.open(`${comprasExitosas} compras realizadas con éxito`, "OK", { duration: 2000 });
      },3000);  
    }
  
    this.saveCarrito();
    this.updateSubTotal();
  
    this.listaproductos = this.listaproductos.filter(producto => producto.stock > 0);
    this._filter(this.miform.value || '');
    this.cdr.detectChanges();
  }
}
