import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router,
    private sharing_data_service: SharingDataService){
    this.cartItems = this.router.getCurrentNavigation()?.extras.state!['cartItems'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCartItem(id:number){
    this.sharing_data_service.idProductEventEmitter.emit(id);
  }

  
}
