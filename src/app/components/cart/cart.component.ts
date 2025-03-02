import { Component, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { itemsState } from '../../store/items.reducer';
import { getTotal } from '../../store/items.actions';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private store: Store<{items: itemsState}>,
    private sharing_data_service: SharingDataService)
    {
      store.select('items').subscribe(state => {
        this.cartItems = state.items;
        this.total = state.total;
      })
  }

  ngOnInit(): void {
    this.store.dispatch(getTotal());
  }

  onDeleteCartItem(id:number){
    this.sharing_data_service.idProductEventEmitter.emit(id);
  }

  
}
