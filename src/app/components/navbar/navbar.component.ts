import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() total: number = 0;
  @Input() products: Product[] = [];
}
