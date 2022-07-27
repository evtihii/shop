import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsInCart } from '../../models/products-in-cart.model';

@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() product!: ProductsInCart;

  // я бы так не делал, так как компонент получает данные,
  // то и пусть отдает их родителю, а не выполняет над ними операцию с помощью сервиса
  constructor(private cart: CartService) {}

  ngOnInit(): void {}

  addOne() {
    this.cart.onQuantityIncrease(this.product);
  }

  removeOne() {
    this.cart.onQuantityDecrease(this.product);
  }

  deleteItem() {
    this.cart.onDeleteItem(this.product);
  }

  get fullPrice() {
    return this.product?.product.price * this.product?.quantity;
  }
}
