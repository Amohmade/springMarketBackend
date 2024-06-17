import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, firstValueFrom} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
import { AuthService } from '../../../../services/auth.service';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_base: number;
  precio_venta: number;
  cantidad: number;
}

interface CarritoItem {
  productoEstablecimientoId: number;
  cantidad: number;
}

@Component({
  selector: 'app-infoscanbarras',
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
    HttpClientModule,
    BarcodeScannerComponent
  ],
  templateUrl: './infoscanbarras.component.html',
  styleUrl: './infoscanbarras.component.css'
})
export class InfoscanbarrasComponent implements OnInit{

  listaproductos: Producto[] = [];

  audio = document.getElementById('play');

  miform = new FormControl('');
  
  filteredOptions!: Observable<Producto[]>;

  selectedProducto: Producto | null = null;

  productos:any[]=[];

  subTotal!: any;

  role:string = "";
  id:string = "";

  constructor(private http: HttpClient,
    private authService:AuthService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.fetchListaProductos();
    this.loadCarrito();
    this.productos = this.getProducto();
  }

  fetchListaProductos(): void {
    this.authService.getWithToken<Producto[]>('establecimientos/productos').subscribe({
      next: (data: Producto[]) => {
        this.listaproductos = data;
      },
      error: (error) => {
        console.error('Error fetching productos:', error);
      }
    });
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
    localStorage.setItem('carrito_compra',JSON.stringify(this.productos))
  }

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
    this.productos = JSON.parse(localStorage.getItem('carrito_compra') as any) || [];
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
    localStorage.removeItem("carrito_compra");
    this.productos = [];
    this.updateSubTotal();
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + (producto.precioVenta * producto.cantidad);
    }, 0);
  }

  onScannedProduct(barcode: string) {
    const producto = this.listaproductos.find(p => p.id.toString() === barcode);
    if (producto) {
      this.addProducto(producto);
      const audio = document.getElementById('play') as HTMLAudioElement;
      if (audio) {
        audio.play();
      }
    }
  }

  prepareCompraData(): any[] {
    return this.productos.map(producto => ({
      productoEstablecimientoId: producto.id,
      cantidad: producto.cantidad
    }));
  }

  async realizarCompra(): Promise<void> {
    const compraData = this.prepareCompraData();
    const apiUrl = `establecimientos/ventas`;
    const comprasFallidas: Producto[] = [];
  
    for (const item of compraData) {
      try {
        await firstValueFrom(this.authService.postWithToken(apiUrl, [item]));
        this._snackBar.open(`Compra realizada`, "OK");
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error: any) {
        const productoFallido = this.productos.find(p => p.id === item.productoEstablecimientoId);
        if (productoFallido) {
          this._snackBar.open(`Quedan ${productoFallido.stock} unidades de ${productoFallido.nombre}`, "OK");
          await new Promise(resolve => setTimeout(resolve, 2000));
          comprasFallidas.push(productoFallido);
        }
      }
    }
    
    this.productos = comprasFallidas;
    this.saveCarrito();
    this.updateSubTotal();
  } 
}
