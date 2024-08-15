import { bootstrapApplication } from '@angular/platform-browser';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { addIcons } from 'ionicons';
import {home, cube, enter, exit, pricetags, key, business, people, person, mail, lockClosed, eye} from 'ionicons/icons';

addIcons({
  'home': home,
  'cube': cube,
  'enter': enter,
  'exit': exit,
  'pricetags': pricetags,
  'key': key,
  'business': business,
  'people': people,
  'person': person,
  'mail': mail,
  'lock-closed': lockClosed,
  'eye': eye,
});
<<<<<<< HEAD
=======
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
>>>>>>> goita
=======
>>>>>>> origin/master

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
    importProvidersFrom(HttpClientModule)
  ],
}).then(() => {
  defineCustomElements(window);
<<<<<<< HEAD
=======
    importProvidersFrom(HttpClient),provideHttpClient()

  ],
>>>>>>> goita
=======
>>>>>>> origin/master
});
