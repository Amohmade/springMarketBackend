import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio_coste: number;
  precio_venta: number;
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
    MatButtonModule
  ],
  templateUrl: './editar-pro.component.html',
  styleUrls: ['./editar-pro.component.css']
})
export class EditarProComponent {
  form: FormGroup;
  role: number;

  constructor(
    public dialogRef: MatDialogRef<EditarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {producto: Producto, role: number },
    private fb: FormBuilder,
  ) {
    this.role = data.role;
    this.form = this.fb.group({
      id: [data.producto.id, Validators.required],
      nombre: [data.producto.nombre, Validators.required],
      stock: [data.producto.stock, Validators.required],
      precio_base: [data.producto.precio_coste, Validators.required],
    });
    if (this.role === 1) {
      this.form.addControl('precio_venta', this.fb.control(data.producto.precio_venta, Validators.required));
    }
  }

  onSave(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}