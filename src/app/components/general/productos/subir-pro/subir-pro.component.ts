import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-subir-pro',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './subir-pro.component.html',
  styleUrl: './subir-pro.component.css'
})
export class SubirProComponent {
  archivoSeleccionado: File | null = null;
  id:string = "";

  constructor(
    public dialogRef: MatDialogRef<SubirProComponent>,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      this.archivoSeleccionado = file;
    } else {
      this.archivoSeleccionado = null;
      this._snackBar.open(`Selecciona un archivo json`, "OK");
    }
  }

  onUploadClick(): void {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('file', this.archivoSeleccionado);
      
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post(`http://localhost:8082/proveedores/productos`, formData,{ headers })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error:', error);
            this._snackBar.open(`Error, vuelva a intentarlo`, "OK");
            return throwError(() => new Error('Error subiendo el archivo'));
          })
        )
        .subscribe(response => {
          console.log('Subida exitosa:', response);
          this.dialogRef.close(this.archivoSeleccionado);
          this._snackBar.open(`Archivo enviado con exito`, "OK");
        });
    }
  }
}
