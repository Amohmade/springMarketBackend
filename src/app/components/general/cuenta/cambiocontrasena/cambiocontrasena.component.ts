import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cambiocontrasena',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './cambiocontrasena.component.html',
  styleUrl: './cambiocontrasena.component.css'
})
export class CambiocontrasenaComponent{

  cambioForm = new FormGroup({
    actual: new FormControl('', [
      Validators.required,
    ]),
    nueva: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ){}

  enviar(): void {
    if (this.cambioForm.valid) {
      const actual = this.cambioForm.value.actual;
      const nueva = this.cambioForm.value.nueva;
  
      this.authService.postWithToken<any>('usuarios/cambiarContrasena', {
        contrasenaActual: actual,
        nuevaContrasena: nueva
      }).subscribe({
        next: (response) => {
          if (response.includes("Contraseña cambiada correctamente")) {
            this._snackBar.open('Contraseña cambiada exitosamente', 'OK', { duration: 3000 });
            this.cambioForm.reset();
          } else {
            this._snackBar.open('Error al cambiar contraseña. Consulte el log para más detalles.', 'OK', { duration: 3000 });
            console.error('Password change failed:', response);
          }
        },
        error: (error) => {
          this._snackBar.open('Error al cambiar contraseña. Intente nuevamente.', 'OK', { duration: 3000 });
          console.error('Error:', error);
        }
      });    
    } else {
      this._snackBar.open('Por favor complete el formulario correctamente', 'OK', { duration: 3000 });
    }
  }
}
