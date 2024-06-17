import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-acceder',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './acceder.component.html',
  styleUrl: './acceder.component.css'
})
export class AccederComponent{

  hide=true;
  errorMsg: string = '';

  userForm = new FormGroup({
    correo: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.required
    ]),
    contrasena: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.required
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    if (this.userForm.valid) {
      const correo = this.userForm.value.correo!;
      const contrasena = this.userForm.value.contrasena!;
      this.authService.login({ correo: correo, contrasena }).subscribe(success => {
        if (success) {
          this.router.navigate(['/Menu']);
          this.errorMsg = '';
        } else {
          this.errorMsg = 'Error en la peticion, vuelva a intentarlo.';
        }
      });
    }
  }
}
