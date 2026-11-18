import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  title = input('Confirmar eliminación');
  message = input('¿Seguro que quieres eliminar este elemento?');
  confirmed = output<boolean>();
}
