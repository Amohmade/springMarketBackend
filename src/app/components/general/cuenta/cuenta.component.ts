import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiciorolService } from '../../../serviciorol.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Usuario{
  id:string,
  nombre:string,
  email:string,
  telefono:string
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

  id: string = "";
  role: string = "";

  user:Usuario | undefined;

  isReadOnly = true;

  hide=true;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private serviciorol:ServiciorolService
  ){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  ngOnInit(): void {
    this.fetchDatosUsuario(this.id).subscribe(data => {
      this.user = data;
      this.registerForm.patchValue(data); // Populate the form with user data
    });
  }

  fetchDatosUsuario(id: string): Observable<Usuario>{
    const apiUrl = this.role === 'Establecimiento'
    ? `http://localhost:8082/establecimientos/${this.id}`
    : `http://localhost:8082/proveedores/${this.id}`;
    return this.http.get<Usuario>(apiUrl);
  }

  registerForm = new FormGroup({
    nombre: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.required
    ]),
    telefono: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.required
    ]),
    email: new FormControl<string>('',[
      Validators.email,
      Validators.required
    ]),
  });

  enviar(){
    if (this.registerForm.dirty) {
      console.log(this.registerForm.value);
      const userData: Usuario = this.registerForm.value as Usuario;
      this.editarDatosUsuario(userData).subscribe(data => {
        this._snackBar.open(`Datos de usuario actualizados`, "OK");
      });
    } else {
      this._snackBar.open(`Error, vuelva a intentarlo`, "OK");
    }
  }

  toggleReadOnly(): void {
    this.isReadOnly = !this.isReadOnly;
  }
  
  editarDatosUsuario(userData: Usuario): Observable<any> {
    const apiUrl = this.role === 'Establecimiento'
  ? `http://localhost:8082/establecimientos/${this.id}`
  : `http://localhost:8082/proveedores/${this.id}`;
    return this.http.put(apiUrl, userData);
  }
}
