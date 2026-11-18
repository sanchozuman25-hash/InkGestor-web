import { Component, input, output } from '@angular/core';
import { Product } from '../../modals/product-modal/product-modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
  editClicked = output<void>();
  deleteClicked = output<void>();
}
