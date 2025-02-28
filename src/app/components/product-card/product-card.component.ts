import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() addToCartEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddToCart(product: Product){
    this.addToCartEventEmitter.emit(product);
  }
}
