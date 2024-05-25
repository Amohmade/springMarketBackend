import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserMenuComponent } from './components/general/user-menu/user-menu.component';
import { ErrorComponent } from './pages/error/error.component';
import { EscanearComponent } from './components/general/escanear/escanear.component';
import { InfoscanComponent } from './components/general/escanear/infoscan/infoscan.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { ProductosComponent } from './components/general/productos/productos.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EntrarComponent } from './components/home/entrar/entrar.component';
import { AccederComponent } from './components/home/entrar/acceder/acceder.component';
import { RegistroComponent } from './components/home/entrar/registro/registro.component';
import { RecuperarComponent } from './components/home/entrar/recuperar/recuperar.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'Cuenta',
        component: EntrarComponent,
        children:[
            {
                path: '',
                component: AccederComponent,
                title: 'Entrar'
            },
            {
                path: 'Registro',
                component: RegistroComponent,
                title: 'Registrar'
            },
            {
                path: 'Recuperar',
                component: RecuperarComponent,
                title: 'Registrar'
            },
            {
                path: '**',
                component: ErrorComponent,
                title: 'Pagina no encontrada'
            }
        ],
        title: 'Mi cuenta'
    },
    {
        path: 'Menu',
        component: MenuComponent,
        children:[
            {
                path: '',
                component: UserMenuComponent,
            },
            {
                path: 'Escanear',
                component: EscanearComponent,
                children:[
                    {
                        path: 'QR',
                        component: InfoscanComponent,
                        children:[
                            {
                                path: 'QR/id:',
                                component: InfoscanComponent,
                                title: 'Info QR'
                            }
                        ],
                        title: ' Buscar por QR'
                    },
                    {
                        path: 'Buscar',
                        component: InfoscanComponent,
                        children:[
                            {
                                path: 'Buscar/id:',
                                component: InfoscanComponent,
                                title: 'Info producto'
                            }
                        ],
                        title: 'Buscar producto'
                    },
                ],
                title: 'Escanear'
            },
            {
                path: 'Productos',
                component: ProductosComponent,
                title: 'Productos'
            },
            {
                path: 'Estadisticas',
                component: EstadisticasComponent,
                title: 'Estadisticas'
            },
            {
                path: 'Proveedores',
                component: EstadisticasComponent,
                title: 'Proveedores'
            },
            {
                path: 'Pedidos',
                component: EstadisticasComponent,
                title: 'Estadisticas'
            },
            {
                path: 'Mi Cuenta',
                component: EstadisticasComponent,
                title: 'Estadisticas'
            },
            {
                path: '**',
                component: ErrorComponent,
                title: 'Pagina no encontrada'
            }
        ],
        title: 'Menu'
    },
    // {
    //     path: 'Menu/Escanear',
    //     component: EscanearComponent,
    //     title: 'Escanear'
    // },
    {
        path: '**',
        component: ErrorComponent,
        title: 'Pagina no encontrada'
    }
];
