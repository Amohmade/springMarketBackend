import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-subir-pro',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subir-pro.component.html',
  styleUrl: './subir-pro.component.css'
})
export class SubirProComponent {
  archivoSeleccionado: File | null = null;

  constructor(public dialogRef: MatDialogRef<SubirProComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0] ?? null;
  }

  onUploadClick(): void {
    if (this.archivoSeleccionado) {
      this.dialogRef.close(this.archivoSeleccionado);
    }
  }
}
