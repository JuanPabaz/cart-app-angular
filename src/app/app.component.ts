import { Component } from '@angular/core';
import { CartAppComponent } from './components/cart-app/cart-app.component';

@Component({
  selector: 'app-root',
  imports: [CartAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cart-app';
}
