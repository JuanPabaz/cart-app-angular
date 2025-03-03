import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { cartItemsReducer } from './store/items.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
        items: cartItemsReducer,
        products: productReducer
    }), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideEffects(ProductsEffects)]
};
