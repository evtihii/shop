import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Product } from 'src/app/product/models/product.model';
import { ProductsInCart } from '../models/products-in-cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart$: BehaviorSubject<ProductsInCart[]> = new BehaviorSubject<
    ProductsInCart[]
  >([]);

  cartItems: Product[] = [];

  constructor() {}

  addToCart(product: Product) {
    // для чего используется take(1)?
    this.productsInCart$.pipe(take(1)).subscribe((arr) => {
      let alreadyInCart = arr.filter((el) => el.product.id === product.id);

      if (!alreadyInCart.length) {
        this.productsInCart$.next([
          ...this.productsInCart$.value,
          {
            product,
            quantity: 1,
          },
        ]);
      } else {
        arr
          .filter((el) => product.id === el.product.id)
          .map((obj) => obj.quantity++);
      }
    });
  }

  totalCost() {
    let all = 0;
    this.productsInCart$.pipe(take(1)).subscribe((productsInCart) => {
      let initialValue = 0;
      let sum = productsInCart.reduce(
        (acc, curr) => acc + curr.quantity * curr.product.price,
        initialValue
      );
      all = sum;
    });

    return all;
  }

  onQuantityIncrease(product: ProductsInCart) {
    return product.quantity++;
  }

  onQuantityDecrease(product: ProductsInCart) {
    return product.quantity--;
  }

  onDeleteItem(product: ProductsInCart) {
    this.productsInCart$
      .pipe(take(1))
      .subscribe((arr) => arr.splice(arr.indexOf(product), 1));
  }

  totalCart() {
    return this.productsInCart$;
  }
}
