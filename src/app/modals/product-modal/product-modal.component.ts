import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: number;
  studio_id: number;
  category_id: number;
  name: string;
  sku: string;
  description: string | null;
  price: number;
  cost: number | null;
  image: string | null;
  is_piercing: boolean;
  active: boolean;
  quantity: number;
  min_quantity: number;
}

@Component({
  selector: 'app-product-modal',
  imports: [FormsModule],
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent implements OnInit {
  item = input<Product | null>(null);
  saved = output<Product>();
  closed = output<void>();

  form!: Product;

  ngOnInit(): void {
    const current = this.item();
    this.form = current
      ? { ...current }
      : {
          id: 0,
          studio_id: 0,
          category_id: 1,
          name: '',
          sku: '',
          description: null,
          price: 0,
          cost: null,
          image: null,
          is_piercing: false,
          active: true,
          quantity: 0,
          min_quantity: 0,
        };
  }

  save(): void {
    this.saved.emit({ ...this.form });
  }
}