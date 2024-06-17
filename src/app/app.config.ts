import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient,withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
};
