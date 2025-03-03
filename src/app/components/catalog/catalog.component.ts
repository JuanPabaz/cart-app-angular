import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/product.actions';
import { products } from '../../store/product.reducer';

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
    private sharing_data_service: SharingDataService
  ){
    this.store.select('products').subscribe(state => {
      this.products = state.products;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }

  onAddToCart(product: Product){
    this.sharing_data_service.addToCartEventEmitter.emit(product)
  }


}
