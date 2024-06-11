import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

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
    tipo: new FormControl<string>('',[
      // Validators.minLength(3),
      // Validators.required
    ]),
  });
  enviar(){
    console.log(this.registerForm.value);
  }
}
