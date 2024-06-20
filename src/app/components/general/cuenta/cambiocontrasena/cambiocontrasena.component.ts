import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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
          if ( typeof response === "string" && response.includes("No se pudo")) {
            throw new Error(response);
          }else if(typeof response === "string"){
            this._snackBar.open(response, 'OK', { duration: 3000 });
            this.cambioForm.reset();
          };
        },
        error: (error) => {
          this._snackBar.open(error.message, 'OK', { duration: 3000 });
        }
      });
    } else {
      this._snackBar.open('Por favor complete el formulario correctamente', 'OK', { duration: 3000 });
    }
  }
}
