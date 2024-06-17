import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  contrasena:string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl:string = 'http://localhost:8082';
  private jwtHelper = new JwtHelperService();
  private role:string = "";

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        return true;
      })
    );
  }

  register(credentials: { nombre: string; telefono: string; correo: string; contrasena: string; rol: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.authUrl}/register`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getDatosUsuario(): Observable<Usuario> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(`${this.authUrl}/miCuenta`, { headers });
  }
  
  getRol(): Observable<string> {
    return this.getDatosUsuario().pipe(
      map((usuario: Usuario) => usuario.rol)
    );
  }

  getAuthUrl(): string | null {
    return this.authUrl;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getWithToken<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<T>(`${this.authUrl}/${endpoint}`, { headers, params });
  }

  postWithToken<T>(endpoint: string, body: any): Observable<T> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<T>(`${this.authUrl}/${endpoint}`, body, { headers });
  }

  putWithToken<T>(endpoint: string, body: any): Observable<T> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<T>(`${this.authUrl}/${endpoint}`, body, { headers });
  }

  deleteWithToken<T>(endpoint: string): Observable<T> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<T>(`${this.authUrl}/${endpoint}`, { headers });
  }
}
