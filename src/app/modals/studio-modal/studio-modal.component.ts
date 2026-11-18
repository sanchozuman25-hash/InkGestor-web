import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Studio {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  active: boolean;
}

@Component({
  selector: 'app-studio-modal',
  imports: [FormsModule],
  templateUrl: './studio-modal.component.html',
})
export class StudioModalComponent implements OnInit {
  item = input<Studio | null>(null);
  saved = output<Studio>();
  closed = output<void>();

  form!: Studio;

  ngOnInit(): void {
    const current = this.item();
    this.form = current ? { ...current } : { id: 0, name: '', address: '', city: '', phone: '', active: true };
  }

  save(): void {
    this.saved.emit({ ...this.form });
  }
}
