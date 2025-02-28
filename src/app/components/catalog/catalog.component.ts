import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  products: Product[] = [];
  
  constructor(private router: Router,
    private sharing_data_service: SharingDataService
  ){
      this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
  }

  onAddToCart(product: Product){
    this.sharing_data_service.addToCartEventEmitter.emit(product)
  }

}
