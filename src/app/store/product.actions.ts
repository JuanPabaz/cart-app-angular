import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const loadProducts = createAction('loadProducts', props<{products: Product[]}>())