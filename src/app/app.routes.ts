import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CuentaComponent } from './pages/home/entrar/cuenta/cuenta.component';
import { RegistrarComponent } from './pages/home/entrar/registrar/registrar.component';
import { RecuperarcComponent } from './pages/home/entrar/recuperarc/recuperarc.component';
import { UserMenuComponent } from './pages/user-menu/user-menu.component';
import { ErrorComponent } from './pages/error/error.component';
import { EscanearComponent } from './pages/escanear/escanear.component';
import { InfoscanComponent } from './pages/escanear/infoscan/infoscan.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

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
        path: 'Menu',
        component: UserMenuComponent,
        children: [
            {
                path: 'Escanear',
                component: EscanearComponent,
                title: 'Escanear'
            }
        ],
        title: 'Menu'
    },
    {
        path: 'Menu/Escanear/:id',
        component: InfoscanComponent,
        title: 'Info Escaneo'
    },
    {
        path: 'Menu/Estadisticas',
        component: EstadisticasComponent,
        title: 'Estadisticas'
    },
    {
        path: '**',
        component: ErrorComponent,
        title: 'Pagina no encontrada'
    }
];
