import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{
  products: Product[] = [];
  cartItems: CartItem[] = [];
  showCart: boolean = false;

  constructor(private product_service: ProductService){

  }

  ngOnInit(): void {
    this.products = this.product_service.findAll();
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')!) || [];
  }

  onAddToCart(product: Product){
    const hasItem = this.cartItems.find(cartItem => cartItem.product.id === product.id);

    if (hasItem){
      this.cartItems = this.cartItems.map(cartItem => {
        if (cartItem.product.id === product.id){
          return {...cartItem,quantity: cartItem.quantity + 1};
        }
        return cartItem;
      })  
    }else{
      this.cartItems = [...this.cartItems, {product:{...product}, quantity:1}];
    }
  }

  onDeleteCartItem(id: number){
    const hasItem = this.cartItems.find(cartItem => cartItem.product.id === id);
    if (hasItem && hasItem.quantity > 1){
      this.cartItems = this.cartItems.map(cartItem => {
        if (cartItem.product.id === id){
          return {...cartItem, quantity: cartItem.quantity - 1};
        }
        return cartItem;
      })
    }else{
      this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== id);
    }
    if (this.cartItems.length === 0){
      sessionStorage.removeItem('cartItems');
    }
  }

  onShowCart(){
    this.showCart = !this.showCart;
  }
}
