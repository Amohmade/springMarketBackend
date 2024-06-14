import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_coste: number;
  precioVenta: number;
  cantidad: number;
}

@Component({
  selector: 'app-todosproductos',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './todosproductos.component.html',
  styleUrl: './todosproductos.component.css'
})
export class TodosproductosComponent implements OnInit {

  productos: Producto[] = [];
  subTotal!: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<TodosproductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.productos = data.productos || [];
    this.updateSubTotal();
  }
  
  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.saveCarrito();
    });
  }

  //Funciones carrito

  saveCarrito(){
    localStorage.setItem('carrito_todosproveedores',JSON.stringify(this.productos))
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
    this.subTotal = this.productos.reduce((total, producto) => total + producto.precioVenta * producto.cantidad, 0);
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

  deleteProductoCarrito(producto:any){
    const index = this.productos.findIndex((x:any)=> x.id === producto.id);

    if(index > -1){
      this.productos.splice(index,1);
      this.saveCarrito()
    }
  }

  clearCarrito(){
    localStorage.removeItem("carrito_todosproveedores");
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
    const apiUrl = `http://localhost:8082/compras/${this.data.id}`;
    const comprasFallidas: Producto[] = [];

    for (const item of compraData) {
      try {
        await firstValueFrom(this.http.post(apiUrl, [item]));
        this.dialogRef.close();
        this._snackBar.open(`Compra realizada`, "OK");
      } catch (error: any) {
        const productoFallido = this.productos.find(p => p.id === item.productoProveedorId);
        if (productoFallido) {
          this._snackBar.open(`Quedan ${productoFallido.stock} unidades de ${productoFallido.nombre}`, "Error");
          comprasFallidas.push(productoFallido);
        }
      }
    }
    this.productos = comprasFallidas;
    
    this.saveCarrito();
    this.updateSubTotal();
  }
}
