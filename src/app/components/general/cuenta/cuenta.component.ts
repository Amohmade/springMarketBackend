import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {

  name="Usuario";

  nombre:string ="Mohamed";
  telefono:number =123456789;
  correo:string="moha@gmail.com";
  contrasena:string="Mohamed123";

  isReadOnly = true;

  hide=true;

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
    this.isReadOnly = !this.isReadOnly; // Toggle the read-only state
  }
}
