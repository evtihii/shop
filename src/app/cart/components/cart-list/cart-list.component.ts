import { Component, OnInit } from '@angular/core';
import { ProductsInCart } from '../../models/products-in-cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  checked = true;
  productsInCart: ProductsInCart[] = [];
  catSum: number = 0;
  constructor(public cart: CartService) { }

  ngOnInit(): void {
    // разве может быть такое, что свойство productsInCart$ не существует?
    // это же обязательное свойство в сервисе
    this.cart.productsInCart$?.subscribe(e => this.productsInCart = e)
  }

  ngOnDestroy(): void {
    this.cart.productsInCart$?.unsubscribe();
  }

  get productsInCartSum() {
    return this.productsInCart.length;
  }

  get totalCart() {
    return this.cart.totalCost();
  }

}
