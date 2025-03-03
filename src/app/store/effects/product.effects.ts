import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadAllProducts, loadProducts } from "../product.actions";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class ProductsEffects{
    loadProduct$ = createEffect(
        () => inject(Actions).pipe(
            ofType(loadProducts),
            exhaustMap(() => this.product_service.findAll())
        ).pipe(
            map(products => (loadAllProducts({products: products})))
        )
    );
    
    constructor(
        private product_service: ProductService
    ){
        
    }


}