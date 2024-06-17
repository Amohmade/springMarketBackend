import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup,FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  hide=true;

  registroForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
    });
  }

  enviar(): void {
    if (this.registroForm.valid) {
      const { nombre, telefono, correo, contrasena, rol } = this.registroForm.value;
      this.authService.register({ nombre: nombre!, telefono: telefono!, correo: correo!, contrasena: contrasena!, rol: rol! }).subscribe({
        next: (success) => {
          if (success) {
            this.errorMsg = '';
          } else {
            this.errorMsg = 'Error en la petición, vuelva a intentarlo.';
          }
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMsg = 'Ya existe una cuenta con ese correo o teléfono.';
          } else {
            this.errorMsg = 'Error en la petición, vuelva a intentarlo.';
          }
        }
      });
    }
  }
  
}
