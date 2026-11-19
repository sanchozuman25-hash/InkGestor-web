import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card-component/product-card.component';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { Product, ProductModalComponent } from '../../modals/product-modal/product-modal.component';

@Component({
  selector: 'app-products-page',
  imports: [RouterLink, ProductCardComponent, ProductModalComponent, ConfirmDeleteModalComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  private route = inject(ActivatedRoute);

  studioId = Number(this.route.snapshot.paramMap.get('studioId'));
  studioName = this.route.snapshot.queryParamMap.get('name') ?? `Estudio #${this.studioId}`;

  items = signal<Product[]>(
    [
      { id: 1, studio_id: 1, category_id: 1, name: 'Septum acero 8mm', sku: 'PC-0001', description: 'Septum de acero quirúrgico', price: 14, cost: 6.5, image: null, is_piercing: true, active: true, quantity: 15, min_quantity: 5 },
      { id: 2, studio_id: 1, category_id: 2, name: 'Tinta negra Eternal 30ml', sku: 'TN-0009', description: 'Tinta negra para tatuaje', price: 22, cost: 11, image: null, is_piercing: false, active: true, quantity: 2, min_quantity: 5 },
      { id: 3, studio_id: 1, category_id: 3, name: 'Aguja piercing 16G', sku: 'AG-0140', description: null, price: 1.2, cost: 0.4, image: null, is_piercing: true, active: true, quantity: 42, min_quantity: 20 },
      { id: 4, studio_id: 2, category_id: 1, name: 'Septum acero 8mm', sku: 'PC-0001', description: 'Septum de acero quirúrgico', price: 14, cost: 6.5, image: null, is_piercing: true, active: true, quantity: 8, min_quantity: 5 },
      { id: 5, studio_id: 2, category_id: 2, name: 'Tinta roja Eternal 30ml', sku: 'TR-0010', description: 'Tinta roja para tatuaje', price: 22, cost: 11, image: null, is_piercing: false, active: true, quantity: 6, min_quantity: 5 },
    ].filter((p) => p.studio_id === this.studioId),
  );

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
      this.items.update((list) => [...list, { ...item, id: nextId, studio_id: this.studioId }]);
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