import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { HoverProductDirective } from './directives/hover-product.directive';

@NgModule({
  imports: [SharedModule],
  declarations: [ProductComponent, ProductListComponent, HoverProductDirective],
  exports: [ProductListComponent],
})
export class ProductsModule {}
