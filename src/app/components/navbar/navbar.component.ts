import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { itemsState } from '../../store/items.reducer';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItems: CartItem[] = [];

  constructor(private store: Store<{items: itemsState}>){
    store.select('items').subscribe(state => {
      this.cartItems = state.items
    })
  }
}
