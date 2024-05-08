import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { RecuperarcComponent } from './pages/recuperarc/recuperarc.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'Entrar',
        component: CuentaComponent,
        title: 'Mi cuenta'
    },
    {
        path: 'Registro',
        component: RegistrarComponent,
        title: 'Registrar'
    },
    {
        path: 'RecuperarContrasena',
        component: RecuperarcComponent,
        title: 'RecuperarContraseña'
    }
];
