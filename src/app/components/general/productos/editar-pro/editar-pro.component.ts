import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServiciorolService } from '../../../../serviciorol.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precioCoste: number;
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
  ],
  templateUrl: './editar-pro.component.html',
  styleUrls: ['./editar-pro.component.css']
})
export class EditarProComponent {
  form: FormGroup;
  role: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {producto: Producto, role: number },
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private rol: ServiciorolService
  ) {
    this.role = this.rol.getRole();
    const formConfig: { [key: string]: any } = {
      id: [data.producto.id, Validators.required],
      nombre: [data.producto.nombre, Validators.required],
      stock: [data.producto.stock, Validators.required],
      precioVenta: [data.producto.precioVenta, Validators.required]
    };
    
    if (this.role === "Establecimiento") {
      formConfig['precioCoste'] = [data.producto.precioCoste, Validators.required];
    }
    
    this.form = this.fb.group(formConfig);
  }

  onSave(): void {
    if (this.form.valid) {
      console.log(this.form.value)
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    console.log(this.form.value)
    this.dialogRef.close();
  }
}