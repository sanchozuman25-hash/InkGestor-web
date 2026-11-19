import { Component, signal } from '@angular/core';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { Studio, StudioModalComponent } from '../../modals/studio-modal/studio-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-studios-page',
  imports: [RouterLink, StudioModalComponent, ConfirmDeleteModalComponent],  templateUrl: './studios-page.component.html',
})
export class StudiosPageComponent {
  items = signal<Studio[]>([
    { id: 1, name: 'Sacra Corona - Feria', address: 'C. Feria 35', city: 'Sevilla', phone: '600 000 001', active: true },
    { id: 2, name: 'Sacra Corona - Centro', address: 'C. Cuna', city: 'Sevilla', phone: '600 000 002', active: true },
    { id: 3, name: 'Sacra Corona - Nuevo', address: 'Próximamente', city: 'Sevilla', phone: '', active: false },
  ]);

  showModal = signal(false);
  editing = signal<Studio | null>(null);
  deleting = signal<Studio | null>(null);

  openAdd(): void {
    this.editing.set(null);
    this.showModal.set(true);
  }

  openEdit(item: Studio): void {
    this.editing.set(item);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  save(item: Studio): void {
    if (item.id) {
      this.items.update((list) => list.map((i) => (i.id === item.id ? item : i)));
    } else {
      const nextId = Math.max(0, ...this.items().map((i) => i.id)) + 1;
      this.items.update((list) => [...list, { ...item, id: nextId }]);
    }
    this.showModal.set(false);
  }

  askDelete(item: Studio): void {
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
