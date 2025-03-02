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
    // this.calculateTotal();
    this.onDeleteCartItem();
    this.onAddToCart();
  }

  onAddToCart(){
    this.sharing_data_service.addToCartEventEmitter.subscribe(product => {
      
      // this.calculateTotal();
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
          
          // this.calculateTotal();
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

  saveSession(){
    sessionStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
