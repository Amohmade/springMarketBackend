import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CuentaComponent } from './pages/home/entrar/cuenta/cuenta.component';
import { RegistrarComponent } from './pages/home/entrar/registrar/registrar.component';
import { RecuperarcComponent } from './pages/home/entrar/recuperarc/recuperarc.component';
import { UserMenuComponent } from './pages/user-menu/user-menu.component';
import { ErrorComponent } from './pages/error/error.component';

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
    },
    {
        path: 'Mi Cuenta',
        component: UserMenuComponent,
        title: 'Mi Cuenta'
    },
    {
        path: '**',
        component: ErrorComponent,
        title: 'Pagina no encontrada'
    }
];
