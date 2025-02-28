import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() total: number = 0;

  @Output() deleteCartItemEventEmitter = new EventEmitter;

  onDeleteCartItem(id:number){
    this.deleteCartItemEventEmitter.emit(id);
  }
}
