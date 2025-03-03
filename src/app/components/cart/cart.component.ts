import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Store } from '@ngrx/store';
import { itemsState } from '../../store/items.reducer';
import { getTotal, removeFromCart } from '../../store/items.actions';
import Swal from 'sweetalert2';

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
    private store: Store<{items: itemsState}>)
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
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  
}
