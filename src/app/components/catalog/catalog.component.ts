import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/product.actions';
import { products } from '../../store/product.reducer';
import { addItemToCart, getTotal } from '../../store/items.actions';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  products: Product[] = [];
  
  constructor(
    private store: Store<{products: products}>,
    private router: Router
  ){
    this.store.select('products').subscribe(state => {
      this.products = state.products;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }

  onAddToCart(product: Product){
    this.store.dispatch(addItemToCart({product: product}));
    this.store.dispatch(getTotal());
    this.router.navigate(['/cart']);
          
    Swal.fire({
      title: "El producto se ha añadido exitosamente",
      icon: "success"
    })
  }


}
