import { createReducer, on } from "@ngrx/store";
import { loadAllProducts, loadProducts } from "./product.actions";
import { Product } from "../models/product";

export interface products {
    products: Product[];
}
export const productsInitialState: products = {
    products: []
}

export const productReducer = createReducer(
    productsInitialState,
    on(loadProducts, (state) => ({products: [...state.products]})),
    on(loadAllProducts, (state, {products}) => ({products: [...products]}))
)