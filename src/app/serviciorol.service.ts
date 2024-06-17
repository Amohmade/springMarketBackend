import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciorolService {
  private readonly roleKey = 'rolUsuario';
  private readonly id = 'idUsuario';

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  setId(id: string): void {
    localStorage.setItem(this.id, id);
  }

  getId(): string | null {
    return localStorage.getItem(this.id);
  }
}