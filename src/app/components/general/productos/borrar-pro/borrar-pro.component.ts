import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-borrar-pro',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './borrar-pro.component.html',
  styleUrl: './borrar-pro.component.css'
})
export class BorrarProComponent {
  role: string = "";

  constructor(
    public dialogRef: MatDialogRef<BorrarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string,role:string, producto: any },
    private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    const apiUrl = this.data.role === 'ESTABLECIMIENTO'
        ? `establecimientos/productos/${this.data.producto.id}`
        : `proveedores/productos/${this.data.producto.id}`;
    this.authService.deleteWithToken(apiUrl).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting product:', error);
        this._snackBar.open(`Error al eliminar el producto, vuelva a intentarlo`, "OK");
        this.dialogRef.close(false);
      }
    });
  }
}
