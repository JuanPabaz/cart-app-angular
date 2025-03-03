import { Component } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { itemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent{
  cartItems: CartItem[] = [];

  constructor(
    private store: Store<{items: itemsState}>
  ){
    this.store.select('items').subscribe(state => {
      this.cartItems = state.items,
      this.saveSession();
    })
  }

  saveSession(){
    sessionStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
