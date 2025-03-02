import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { addItemToCart, getTotal, removeFromCart } from "./items.actions";

export interface itemsState {
    items: CartItem[],
    total: number
}

export const cartItemsInitialState: itemsState ={
    items: JSON.parse(sessionStorage.getItem('cartItems')!) || [],
    total: 0
}

export const cartItemsReducer = createReducer(
    cartItemsInitialState,
    on(addItemToCart, (state, payload) => {
        const hasItem = state.items.find((cartItem: CartItem) => cartItem.product.id === payload.product.id);
          
        if (hasItem){
            return {
                items: state.items.map((cartItem: CartItem)=> {
                if (cartItem.product.id === payload.product.id){
                    return {...cartItem,quantity: cartItem.quantity + 1};
                }
                return cartItem;}),
                total: state.total}  
        }else{
             return {
                items:[...state.items, {product:{...payload.product}, quantity:1}],
                total:state.total
            };
        }
    }),
    on(removeFromCart, (state, payload) => {
        const hasItem = state.items.find((cartItem:CartItem) => cartItem.product.id === payload.id);
        if (hasItem && hasItem.quantity > 1){
            return {
                items: state.items.map((cartItem:CartItem) => {
                if (cartItem.product.id === payload.id){
                    return {...cartItem, quantity: cartItem.quantity - 1};
                }
                return cartItem;
                }),
                total: state.total}
        }else{
            return {
                items:state.items.filter((cartItem:CartItem) => cartItem.product.id !== payload.id),
                total: state.total
            }
        }
    }),
    on(getTotal, (state) => {
        return {
            items: state.items,
            total: state.items.reduce((accumulator, cartItem) => accumulator + (cartItem.product.price * cartItem.quantity),0)
        }
    })
)