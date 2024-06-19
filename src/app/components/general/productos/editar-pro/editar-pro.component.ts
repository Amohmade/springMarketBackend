import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precioCoste?: number;
  precioVenta: number;
}

@Component({
  selector: 'app-editar-pro',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './editar-pro.component.html',
  styleUrls: ['./editar-pro.component.css']
})
export class EditarProComponent implements OnInit {
  form!: FormGroup;
  role: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {producto: Producto, role: string },
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService:AuthService
  ) {}
  ngOnInit(): void {
    const formConfig: { [key: string]: any } = {
      id: [this.data.producto.id, Validators.required],
      nombre: [this.data.producto.nombre, Validators.required],
      stock: [this.data.producto.stock, Validators.required],
      precioVenta: [this.data.producto.precioVenta, Validators.required]
    };
    if (this.data.role === "ESTABLECIMIENTO") {
      formConfig['precioCoste'] = [this.data.producto.precioCoste || null, Validators.required];
    }

    this.form = this.fb.group(formConfig);
  }

  onSave(): void {
    if (this.form.valid) {
      const apiUrl = this.data.role === 'ESTABLECIMIENTO'
        ? `establecimientos/productos/${this.data.producto.id}`
        : `proveedores/productos/${this.data.producto.id}`;

      this.authService.putWithToken<Producto>(apiUrl, this.form.value).subscribe({
        next: (updatedProducto: Producto) => {
          this.dialogRef.close(updatedProducto);
        },
        error: (error: HttpErrorResponse) => {
          this._snackBar.open(`Error al actualizar el producto. Por favor, inténtelo de nuevo.`, "OK", { duration: 3000 });
        }
      });
    } else {
      this._snackBar.open('Formulario inválido. Por favor, complete todos los campos correctamente.', 'Cerrar',{ duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}