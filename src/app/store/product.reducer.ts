import { createReducer, on } from "@ngrx/store";
import { loadProducts } from "./product.actions";
import { Product } from "../models/product";

export interface products {
    products: Product[];
}
export const productsInitialState: products = {
    products: []
}

export const productReducer = createReducer(
    productsInitialState,
    on(loadProducts, (state, payload) => ({products: [...payload.products]}))
)