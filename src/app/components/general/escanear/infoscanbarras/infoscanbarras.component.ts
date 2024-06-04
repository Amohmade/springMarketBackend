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
import data from '../../../../../assets/json/data.json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_base: number;
  precio_venta: number;
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

  datos: Producto[] = data.map((producto:Producto) => ({
    ...producto,
    precio_venta: producto.precio_base * 1.3
  }));

  audio = document.getElementById('play');

  miform = new FormControl('');
  
  filteredOptions!: Observable<Producto[]>;

  selectedProducto: Producto | null = null;

  productos:any[]=[];

  subTotal!: any;


  //Busqueda producto
  constructor(private http: HttpClient){}

  ngOnInit() {
    this.filteredOptions = this.miform.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.loadCarrito();
    this.productos = this.getProducto();
  }

  private _filter(value: string): Producto[] {
    const filterValue = value === 'string' ? value.toLowerCase() : value.toString();
    return this.datos.filter(producto => 
      producto.id.toString().includes(filterValue)
    );
  }

  onOptionSelected(event: any): void {
    const seleccionado = event.option.value;
    this.selectedProducto = this.datos.find(producto => (producto.id === seleccionado)||(producto.nombre === seleccionado)) || null;
  }

  //Funciones carrito

  getAllProductos(){
    return this.http.get(data);
  }

  getProducto(){
    return this.productos;
  }

  saveCarrito(){
    localStorage.setItem('carrito',JSON.stringify(this.productos))
  }

  addProducto(producto: any){ 
    this.productos.push(producto);
    this.saveCarrito();
    this.subTotal += producto.price;
    console.log(this.subTotal);
  }

  loadCarrito(){
    this.productos = JSON.parse(localStorage.getItem('carrito') as any) || [];
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
    localStorage.clear();
    window.location.reload();
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + producto.precio_venta;
    }, 0);
  }

  // checkout() {
  //   localStorage.setItem('cart_total', JSON.stringify(this.total));
  //   this.router.navigate(['/payment']);
  // }
  onScannedProduct(barcode: string) {
    const producto = this.datos.find(p => p.id.toString() === barcode);
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
