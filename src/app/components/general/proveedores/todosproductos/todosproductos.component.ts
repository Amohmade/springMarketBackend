import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';

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
    MatButtonModule
  ],
  templateUrl: './todosproductos.component.html',
  styleUrl: './todosproductos.component.css'
})
export class TodosproductosComponent implements OnInit {

  productos: Producto[] = [];
  subTotal!: any;

  constructor(
    public dialogRef: MatDialogRef<TodosproductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  // getProducto(){
  //   return this.productos;
  // }

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
  
  // loadCarrito(){
  //   this.productos = JSON.parse(localStorage.getItem('carrito_todosproveedores') as any) || [];
  // }

  // productoCarrito(producto:any){
  //   return this.productos.findIndex((x:any)=> x.id === producto.id) > -1;
  // }
  
  deleteProductoCarrito(producto:any){
    const index = this.productos.findIndex((x:any)=> x.id === producto.id);

    if(index > -1){
      this.productos.splice(index,1);
      this.saveCarrito()
    }
  }

  clearCarrito(){
    sessionStorage.removeItem("carrito_todosproveedores");
    this.productos = [];
    this.updateSubTotal();
    window.location.reload();
  }

  total(): number {
    return this.productos.reduce((total, producto) => {
      return total + (producto.precioVenta * producto.cantidad);
    }, 0);
  }
}
