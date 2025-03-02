import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { itemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { addItemToCart, getTotal, removeFromCart } from '../../store/items.actions';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{
  cartItems: CartItem[] = [];

  constructor(
    private store: Store<{items: itemsState}>,
    private sharing_data_service: SharingDataService,
    private router: Router
  ){
    this.store.select('items').subscribe(state => {
      this.cartItems = state.items,
      this.saveSession();
    })
  }

  ngOnInit(): void {
    this.onDeleteCartItem();
    this.onAddToCart();
  }

  onAddToCart(){
    this.sharing_data_service.addToCartEventEmitter.subscribe(product => {
      
      this.store.dispatch(addItemToCart({product: product}));
      this.store.dispatch(getTotal());
      this.router.navigate(['/cart']);
      
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
          
          this.store.dispatch(removeFromCart({id: id}));
          this.store.dispatch(getTotal());
          this.router.navigate(['/cart']);
          
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    })
  }

  saveSession(){
    sessionStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
