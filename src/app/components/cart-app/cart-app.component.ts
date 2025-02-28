import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart-app',
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{
  products: Product[] = [];
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private product_service: ProductService,
    private sharing_data_service: SharingDataService
  ){

  }

  ngOnInit(): void {
    this.products = this.product_service.findAll();
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')!) || [];
    this.calculateTotal();
    this.onDeleteCartItem();
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
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCartItem(){
    this.sharing_data_service.idProductEventEmitter.subscribe(id => {
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
      this.calculateTotal();
      this.saveSession();
    })
  }

  calculateTotal(){
    this.total = this.cartItems
    .reduce((accumulator, cartItem) => accumulator + (cartItem.product.price * cartItem.quantity),0);
  }

  saveSession(){
    sessionStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
