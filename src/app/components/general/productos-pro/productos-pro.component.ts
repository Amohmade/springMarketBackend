import { Component,OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { UserheaderComponent } from '../userheader/userheader.component';
import { BarraMenuComponent } from '../barra-menu/barra-menu.component';
import data from '../../../../assets/json/data.json';

@Component({
  selector: 'app-productos-pro',
  standalone: true,
  imports: [
    UserheaderComponent,
    CommonModule,
    BarraMenuComponent,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ],
  templateUrl: './productos-pro.component.html',
  styleUrl: './productos-pro.component.css'
})
export class ProductosProComponent implements OnInit {

  nombre:string = "Proveedor";

  columnas: string[] = ['id', 'nombre', 'stock', 'precio_base', 'precio_venta'];
  datos = data;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.datos.forEach((producto:any) => {
      producto.precio_venta = producto.precio_base * 1.3;
    });

    this.iniciarPaginator();
  }

  iniciarPaginator(): void {
    setTimeout(() => {
      this.datos = new MatTableDataSource(this.datos);
      this.datos.paginator = this.paginator;
    });
  }
}
