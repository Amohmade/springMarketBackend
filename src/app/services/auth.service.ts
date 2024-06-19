import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials: { correo: string; contrasena: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Menu']);
        return true;
      })
    );
  }

  register(credentials: { nombre: string; telefono: string; correo: string; contrasena: string; rol: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.authUrl}/register`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/Menu']);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError('Ya existe una cuenta con ese correo o teléfono.');
          } else {
            let errorMessage = 'Error en la petición, vuelva a intentarlo.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            return throwError(errorMessage);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['Cuenta']);
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
    return this.http.get<Usuario>(`${this.authUrl}/usuarios/miCuenta`, { headers });
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

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000 + 7200;

    return decodedToken.exp < currentTime;
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
  
    return this.http.post<T>(`${this.authUrl}/${endpoint}`, body, { headers, responseType: 'json'}).pipe(
      catchError((error: any) => {
        let errorMsg = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `1: ${error.error.message}`;
        } else if (error.error && typeof error.error === 'string') {
          errorMsg = `2: ${error.error}`;
        } else if (error.error && error.error.message) {
          errorMsg = `3: ${error.error.message}`;
        } else {
          errorMsg = `4: ${JSON.stringify(error.error)}`;
        }
        console.log(errorMsg)
        return throwError(() => new Error(errorMsg));
      }),
      map((response: any) => {
        let errorMsg = 'An error occurred';
        if(response.ok){
          errorMsg = response.json();
        }
        if (response && response.data) {
          return response.data as T;
        } else {
          throw new Error('Invalid response format');
        }
      })
    );
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
