import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

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
  constructor(
    public dialogRef: MatDialogRef<BorrarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
