import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EscanearComponent } from './components/general/escanear/escanear.component';
import { InfoscanComponent } from './components/general/escanear/infoscan/infoscan.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { ProductosComponent } from './components/general/productos/productos.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EntrarComponent } from './components/home/entrar/entrar.component';
import { AccederComponent } from './components/home/entrar/acceder/acceder.component';
import { RegistroComponent } from './components/home/entrar/registro/registro.component';
import { ErrorComponent } from './components/general/error/error.component';
import { CuentaComponent } from './components/general/cuenta/cuenta.component';
import { ProveedoresComponent } from './components/general/proveedores/proveedores.component';
import { ProductosProComponent } from './components/general/proveedores/productos-pro/productos-pro.component';
import { InfoscanbarrasComponent } from './components/general/escanear/infoscanbarras/infoscanbarras.component';
import { ComprarportodosComponent } from './components/general/proveedores/comprarportodos/comprarportodos.component';
import { CambiocontrasenaComponent } from './components/general/cuenta/cambiocontrasena/cambiocontrasena.component';
import { authGuard } from './auth.guard';

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
                title: 'Acceder'
            },
            {
                path: 'Registro',
                component: RegistroComponent,
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
                pathMatch: 'full',
                redirectTo: 'Escanear'
            },
            {
                path: 'Escanear',
                component: EscanearComponent,
                title: 'Escanear'
            },
            {
                path: 'Escanear/Codigo_de_Barras',
                component: InfoscanbarrasComponent,
                title: ' Codigo de Barras'
            },
            {
                path: 'Escanear/Buscar',
                component: InfoscanComponent,
                title: 'Buscar producto'
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
                component: ProveedoresComponent,
                title: 'Proveedores'
            },
            {
                path: 'Proveedores/Todos',
                component: ComprarportodosComponent,
                title: 'Proveedores'
            },
            {
                path: 'Proveedores/:proveedor',
                component: ProductosProComponent,
                title: 'Productos Proveedor'
            },
            {
                path: 'Pedidos',
                component: EstadisticasComponent,
                title: 'Estadisticas'
            },
            {
                path: 'Cuenta',
                component: CuentaComponent,
                children:[
                    {
                        path: 'Cambiar_contrasena',
                        component: CambiocontrasenaComponent,
                        title: 'Cambiar contraseña'
                    }
                ],
                title: 'Mi Cuenta'
            },
            {
                path: '**',
                component: ErrorComponent,
                title: 'Pagina no encontrada'
            }
        ],
        title: 'Menu'
    },
    {
        path: '**',
        component: ErrorComponent,
        title: 'Pagina no encontrada'
    }
];
