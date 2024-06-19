import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule, MatStartDate} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

interface Producto {
  id: number;
  nombre: string;
  unidades: number;
  width: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit{
  
  Topventas: Producto[] = [
    { id: 1, nombre: "Pan", unidades: 0, width: 0 },
    { id: 2, nombre: "Coca Cola", unidades: 0, width: 0 },
    { id: 3, nombre: "Leche", unidades: 0, width: 0 }
  ];

  anhoActual: number;
  mesActual: number;

  rangoGrupoFechas: FormGroup;

  constructor(private fb: FormBuilder) {
    const now = new Date();
    this.mesActual = now.getMonth() + 1;
    this.anhoActual = now.getFullYear();

    this.rangoGrupoFechas = this.fb.group({
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required]
    });
  }

  originalUnits: Producto[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.originalUnits = [
        { id: 1, nombre: "Pan", unidades: 400, width: 0 },
        { id: 2, nombre: "Coca Cola", unidades: 300, width: 0 },
        { id: 3, nombre: "Leche", unidades: 200, width: 0 }
      ];
      this.animateProducts();
    }, 0);
  }

  animateProducts(): void {
    this.Topventas.forEach((producto, index) => {
      const targetUnits = this.originalUnits[index].unidades;
      const duration = 1000;
      const increment = targetUnits / (duration / 5);
      const maxWidth = targetUnits;
      let currentUnits = 0;

      const interval = setInterval(() => {
        if (currentUnits < targetUnits) {
          currentUnits += increment;
          this.Topventas[index].unidades = Math.min(Math.ceil(currentUnits), targetUnits);
          this.Topventas[index].width = maxWidth;
        } else {
          this.Topventas[index].unidades = targetUnits;
          this.Topventas[index].width = maxWidth; 
          clearInterval(interval);
        }
      }, 10);
    });
  }

  cambiarMes(cambio: number) {
    this.mesActual += cambio;
    if (this.mesActual < 1) {
      this.mesActual = 12;
      this.anhoActual -= 1;
    } else if (this.mesActual > 12) {
      this.mesActual = 1;
      this.anhoActual += 1;
    }
  }

  getMes(): string {
    return this.mesActual.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  }

  getAnho(): string {
    return this.anhoActual.toString();
  }

  Imprimir() {
    if (this.rangoGrupoFechas.valid) {
      const { fechaInicio, fechaFin } = this.rangoGrupoFechas.value;
    } else {
    }
  }
}
