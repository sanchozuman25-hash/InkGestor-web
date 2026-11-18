import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card-component/product-card.component';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { Product, ProductModalComponent } from '../../modals/product-modal/product-modal.component';

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent, ProductModalComponent, ConfirmDeleteModalComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  items = signal<Product[]>([
    { id: 1, category_id: 1, name: 'Septum acero 8mm', sku: 'PC-0001', description: 'Septum de acero quirúrgico', price: 14, cost: 6.5, image: null, is_piercing: true, active: true },
    { id: 2, category_id: 2, name: 'Tinta negra Eternal 30ml', sku: 'TN-0009', description: 'Tinta negra para tatuaje', price: 22, cost: 11, image: null, is_piercing: false, active: true },
    { id: 3, category_id: 3, name: 'Aguja piercing 16G', sku: 'AG-0140', description: null, price: 1.2, cost: 0.4, image: null, is_piercing: true, active: true },
  ]);

  showModal = signal(false);
  editing = signal<Product | null>(null);
  deleting = signal<Product | null>(null);

  openAdd(): void {
    this.editing.set(null);
    this.showModal.set(true);
  }

  openEdit(item: Product): void {
    this.editing.set(item);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  save(item: Product): void {
    if (item.id) {
      this.items.update((list) => list.map((i) => (i.id === item.id ? item : i)));
    } else {
      const nextId = Math.max(0, ...this.items().map((i) => i.id)) + 1;
      this.items.update((list) => [...list, { ...item, id: nextId }]);
    }
    this.showModal.set(false);
  }

  askDelete(item: Product): void {
    this.deleting.set(item);
  }

  onDeleteConfirmed(confirmed: boolean): void {
    const item = this.deleting();
    if (confirmed && item) {
      this.items.update((list) => list.filter((i) => i.id !== item.id));
    }
    this.deleting.set(null);
  }
}
