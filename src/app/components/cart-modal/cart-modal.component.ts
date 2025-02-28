import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';


@Component({
  selector: 'app-cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  @Input() cartItems: CartItem[] = [];
  // @Input() total: number = 0;

  @Output() deleteCartItemEventEmitter = new EventEmitter
  @Output() showCartEventEmitter = new EventEmitter;

  onDeleteCartItem(id: number){
    this.deleteCartItemEventEmitter.emit(id);
  }

  onShowCart(){
    this.showCartEventEmitter.emit();
  }
}
