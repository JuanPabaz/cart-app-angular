import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const addItemToCart = createAction('addItemToCart', props<{product: Product}>());
export const removeFromCart = createAction('removeFromCart', props<{id: number}>());
export const getTotal = createAction('getTotal');