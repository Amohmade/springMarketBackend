import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, firstValueFrom} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {AsyncPipe, CommonModule, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

interface Producto {
  id: number;
  nombre: string;
  precioVenta: number;
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
    MatDividerModule,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule
  ],
  templateUrl: './productos-pro.component.html',
  styleUrl: './productos-pro.component.css'
})

export class ProductosProComponent implements OnInit {

  listaproductos: Producto[] = [];
  filteredProductos: Producto[] = [];

  miform = new FormControl('');
  
  filteredOptions!: Observable<Producto[]>;

  selectedProducto: Producto | null = null;

  productos:any[]=[];

  subTotal!: any;

  proveedor: string | null = null;

  role:string = "";
  id:string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit():void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.proveedor = params.get('proveedor');
      if (this.proveedor) {
        this.fetchListaProductos(this.proveedor).subscribe(data => {
          this.listaproductos = data;
          this.filteredProductos = data; // Show all products initially
          this.filteredOptions = this.miform.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
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
    const apiUrl = `proveedores/productosProveedor/${proveedor}`;
    return this.authService.getWithToken<Producto[]>(apiUrl);
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

  onCantidadChange(producto: Producto) {
    const cantidad = Number(producto.cantidad);
    if (isNaN(cantidad) || cantidad < 1) {
      this._snackBar.open(`La cantidad debe ser un número positivo`, 'OK', { duration: 3000 });
      producto.cantidad = 1;
    }
    this.updateCantidad(producto, cantidad);
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
    let comprasExitosas = 0;
  
    for (const item of compraData) {
      try {
        await firstValueFrom(this.authService.postWithToken(apiUrl, [item]));
        comprasExitosas++;
      } catch (error: any) {
        const productoFallido = this.productos.find(p => p.id === item.productoEstablecimientoId);
        if (productoFallido) {
          this._snackBar.open(`Quedan ${productoFallido.stock} unidades de ${productoFallido.nombre}`, "OK", { duration: 3000 });
          await new Promise(resolve => setTimeout(resolve, 2000));
          comprasFallidas.push(productoFallido);
        }
      }
    }
  
    if (comprasExitosas > 0) {
      this._snackBar.open(`${comprasExitosas} compras realizadas con éxito`, "OK", { duration: 3000 });
    }
  
    this.productos = comprasFallidas;
    this.saveCarrito();
    this.updateSubTotal();
  }
}
