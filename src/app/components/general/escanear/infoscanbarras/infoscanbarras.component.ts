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
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_base: number;
  precio_venta: number;
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
    AsyncPipe,
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


  //Busqueda producto
  constructor(private http: HttpClient){}

  ngOnInit() {
    this.fetchListaProductos(1).subscribe(data => {
      this.listaproductos = data;
    });
    console.log(this.listaproductos);
    this.filteredOptions = this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.loadCarrito();
    this.productos = this.getProducto();
  }

  fetchListaProductos(id:number): Observable<Producto[]> {
    const apiUrl = `api/productos?establecimiento=${id}`;
    return this.http.get<Producto[]>(apiUrl);
  }

  private _filter(value: string): Producto[] {
    const filterValue = value === 'string' ? value.toLowerCase() : value.toString();
    return this.listaproductos.filter(producto => 
      producto.id.toString().includes(filterValue)
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
    sessionStorage.removeItem("carrito_compra");
    this.productos = [];
    this.updateSubTotal();
    window.location.reload();
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + producto.precio_venta;
    }, 0);
  }

  onScannedProduct(barcode: string) {
    const producto = this.listaproductos.find(p => p.id.toString() === barcode);
    // if (producto && !this.productoCarrito(producto)) {
    if (producto) {
      this.addProducto(producto);
      const audio = document.getElementById('play') as HTMLAudioElement;
      if (audio) {
        audio.play();
      }
    }
  }
}
