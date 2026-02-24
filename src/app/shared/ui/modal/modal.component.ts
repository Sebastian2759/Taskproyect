import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @ViewChild('dlg') dlg!: ElementRef<HTMLDialogElement>;

  open() { this.dlg.nativeElement.showModal(); }
  close() { this.dlg.nativeElement.close(); }
}
