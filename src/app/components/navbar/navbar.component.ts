import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() cartItemNumber: number = 0;

  @Output() showCartEventEmitter = new EventEmitter;
  onShowCart(){
    this.showCartEventEmitter.emit();
  }
}
