import { Component,OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarProComponent } from './editar-pro/editar-pro.component';
import { SubirProComponent } from './subir-pro/subir-pro.component';
import { BorrarProComponent } from './borrar-pro/borrar-pro.component';
import { ServiciorolService } from '../../../serviciorol.service';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precioBase: number;
  precioVenta: number;
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
    MatDialogModule
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
  
  constructor(private http: HttpClient,public dialog: MatDialog,private serviciorol: ServiciorolService){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  archivoSeleccionado: any = null;

  ngOnInit(): void {
    if(this.role == 'Proveedor') {
      this.columnas = ['id', 'nombre', 'stock', 'precio_venta','acciones'];
    }

    this.fetchListaProductos(this.id).subscribe(data => {
      this.productos = data;
      this.iniciarPaginator();
    });
  }

  fetchListaProductos(id: string): Observable<Producto[]>{
    if(this.role == 'Establecimiento'){
      let apiUrl = `http://localhost:8082/establecimientos/productos/${id}`
      return this.http.get<Producto[]>(apiUrl);
    }else{
      let apiUrl = `http://localhost:8082/proveedores/productos/${id}`;
      return this.http.get<Producto[]>(apiUrl);
    }
  }
  
  iniciarPaginator(): void {
    setTimeout(() => {
      this.datos = new MatTableDataSource(this.productos);
      this.datos.paginator = this.paginator;
    });
  }

  subirProductos(): void {
    const dialogRef = this.dialog.open(SubirProComponent, {
      width: '400px'
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
      width: '400px',
      data: { producto, role: this.role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.productos.findIndex(p => p.id === result.id);
        if (index > -1) {
          this.productos[index] = result;
          this.datos = new MatTableDataSource(this.productos);
          this.iniciarPaginator();
        }
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
        this.productos = this.productos.filter(p => p.id !== producto.id);
        this.datos.data = this.productos;
      }
    });
  }
}
