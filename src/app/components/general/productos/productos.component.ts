import { Component,OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarProComponent } from './editar-pro/editar-pro.component';
import { SubirProComponent } from './subir-pro/subir-pro.component';
import { BorrarProComponent } from './borrar-pro/borrar-pro.component';
import { ServiciorolService } from '../../../serviciorol.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precioBase: number;
  precioVenta: number;
  proveedor: {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
  };
} 

@Component({
  selector: 'app-productos-pro',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    EditarProComponent,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  columnas: string[] = ['id', 'nombre', 'stock', 'precio_coste', 'precio_venta','acciones'];
  productos: Producto[] = [];
  datos:any;
  role:string = "";
  id:string = "";

  searchControl = new FormControl();
  
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private serviciorol: ServiciorolService,
    private _snackBar: MatSnackBar,
  ){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  archivoSeleccionado: any = null;

  ngOnInit(): void {
    if(this.role == 'Proveedor') {
      this.columnas = ['id', 'nombre', 'stock', 'precio_venta','acciones'];
    }

    this.fetchListaProductos(this.id).subscribe(data => {
      this.productos = data;
      this.iniciarPaginator();
      this.searchControl.valueChanges.subscribe(value => {
        this.filtrarBusqueda(value);
      });
    });
  }

  fetchListaProductos(id: string): Observable<Producto[]>{
      let apiUrl = this.role === 'Establecimiento'
      ? `http://localhost:8082/establecimientos/productos/${id}`
      : `http://localhost:8082/proveedores/productos/${id}`;
      return this.http.get<Producto[]>(apiUrl);
  }
  
  iniciarPaginator(): void {
    setTimeout(() => {
      this.datos = new MatTableDataSource(this.productos);
      this.datos.paginator = this.paginator;
      this.datos.sort = this.sort!;
    });
  }

  filtrarBusqueda(filterValue: string): void {
    this.datos.filter = filterValue.trim().toLowerCase();
  }

  subirProductos(): void {
    const dialogRef = this.dialog.open(SubirProComponent, {
      width: '400px',
      data: { id: this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archivoSeleccionado = result;
      }
    });
  }

  onArchivoSeleccionado(event: any): void {
      this.archivoSeleccionado = event.target.files[0] ?? null;

  }

  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(EditarProComponent, {
      width: '500px',
      data: { producto, role: this.role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const apiUrl = this.role === 'Establecimiento'
          ? `http://localhost:8082/establecimientos/productos/${this.id}/${result.id}`
          : `http://localhost:8082/proveedores/productos/${this.id}/${result.id}`;

        this.http.put<Producto>(apiUrl, result).subscribe({
          next: (updatedProducto: Producto) => {
            const index = this.productos.findIndex(p => p.id === updatedProducto.id);
            if (index > -1) {
              this.productos[index] = updatedProducto;
              this.datos = new MatTableDataSource(this.productos);
              this.iniciarPaginator();
              this._snackBar.open(`Producto actualizado`, "OK");
            }
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(`Error, vuelva a intentarlo`, "OK");
          }
        });
      }
    });
  }

  eliminarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(BorrarProComponent, {
      width: '400px',
      data: { message: `¿Está seguro de que desea eliminar el producto ${producto.nombre}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const apiUrl = this.role === 'Establecimiento'
          ? `http://localhost:8082/establecimientos/productos/${this.id}/${producto.id}`
          : `http://localhost:8082/proveedores/productos/${this.id}/${producto.id}`;
        this.http.delete(apiUrl).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
            this.datos.data = this.productos;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error deleting product:', error);
          }
        });
      }
    })
  }

  getProveedorLink(producto: Producto): string {
    return `../Proveedores/${producto?.proveedor?.id}`;
  }

  isStockZero(producto: Producto): boolean {
    return producto.stock === 0;
  }
}
