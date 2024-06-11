import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiciorolService } from '../../../serviciorol.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient,private serviciorol:ServiciorolService){
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
  }

  ngOnInit(): void {
    this.role = this.serviciorol.getRole() ?? "";
    this.id = this.serviciorol.getId() ?? "";
    this.fetchDatosUsuario(this.id).subscribe(data => {
      this.user = data;
    });
  }

  fetchDatosUsuario(id: string): Observable<Usuario>{
    if(this.role == 'Establecimiento'){
      let apiUrl = `http://localhost:8082/establecimientos/${id}`
      return this.http.get<Usuario>(apiUrl);
    }else{
      let apiUrl = `http://localhost:8082/proveedores/${id}`;
      return this.http.get<Usuario>(apiUrl);
    }
  }

  registerForm = new FormGroup({
    nombre: new FormControl<string>('',[
      // Validators.minLength(3),
      // Validators.required
    ]),
    telefono: new FormControl<string>('',[
      // Validators.minLength(3),
      // Validators.required
    ]),
    correo: new FormControl<string>('',[
      // Validators.minLength(3),
      // Validators.required
    ]),
    password: new FormControl<string>('',[
      // Validators.minLength(3),
      // Validators.required
    ]),
  });

  enviar(){
    console.log(this.registerForm.value);
  }

  toggleReadOnly(): void {
    this.isReadOnly = !this.isReadOnly;
  }
}
