import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges{
  @Input() cartItems: CartItem[] = [];
  total: number = 0;
  
  @Output() deleteCartItemEventEmitter = new EventEmitter;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCartItem(id:number){
    this.deleteCartItemEventEmitter.emit(id);
  }

  calculateTotal(){
    this.total = this.cartItems
    .reduce((accumulator, cartItem) => accumulator + (cartItem.product.price * cartItem.quantity),0);
  }

  saveSession(){
    sessionStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
