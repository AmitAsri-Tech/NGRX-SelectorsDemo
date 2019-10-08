import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './product';
import { AppState } from './app-state';

const productsSelector = (state) => state.products;

const createProduct = (id, name) => ({
  type: '[Product] ADD',
  payload: { name, id }
});

const updateProduct = (product) => ({
  type: '[Product] UPDATE',
  payload: { ...product }
});

const deleteProduct = (product) => ({
  type: '[Product] DELETE',
  payload: { ...product }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products$;
  newProduct: string;
  id = 1;
  selectedProduct;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(productsSelector);
  }

  select(product: Product) {
    this.selectedProduct = { ...product};
  }

  create() {
    this.store.dispatch(createProduct(this.id++, this.newProduct));
    this.newProduct = '';
  }

  update() {
    this.store.dispatch(updateProduct(this.selectedProduct));
    this.selectedProduct = null;
  }

  delete(product: Product) {
    this.store.dispatch(deleteProduct(product));
  }
}
