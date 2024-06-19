import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  contrasena:string;
  rol: string;
}

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit {

  user:Usuario | undefined;

  isReadOnly = true;

  hide=true;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService:AuthService
  ){
  }

  ngOnInit(): void {
    this.authService.getDatosUsuario().subscribe(data => {
      this.user = data;
      this.editarForm.patchValue(data);
    });
  }

  editarForm = new FormGroup({
    nombre: new FormControl<string>('',[]),
    telefono: new FormControl<string>('',[]),
    correo: new FormControl<string>('',[]),
    rol: new FormControl<string>('',[]),
  });
}
