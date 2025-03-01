import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private product_service: ProductService,
    private sharing_data_service: SharingDataService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    const storedCartItems = sessionStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    this.calculateTotal();
    this.onDeleteCartItem();
    this.onAddToCart();
  }

  onAddToCart(){
    this.sharing_data_service.addToCartEventEmitter.subscribe(product => {
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
      this.router.navigate(['/cart'],
        {state: {cartItems: this.cartItems, total: this.total}});
      
      Swal.fire({
        title: "El producto se ha añadido exitosamente",
        icon: "success"
      })
    })
  }

  onDeleteCartItem(){
    this.sharing_data_service.idProductEventEmitter.subscribe(id => {
      
      Swal.fire({
        title: "Está seguro de eliminar el producto?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
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
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'],
              {state: {cartItems: this.cartItems, total: this.total}});
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
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
