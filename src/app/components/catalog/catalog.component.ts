import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  products!: Product[];
  
  constructor(private sharing_data_service: SharingDataService,
    private product_service: ProductService
  ){
  }

  ngOnInit(): void {
    this.products = this.product_service.findAll();
  }

  onAddToCart(product: Product){
    this.sharing_data_service.addToCartEventEmitter.emit(product)
  }


}
