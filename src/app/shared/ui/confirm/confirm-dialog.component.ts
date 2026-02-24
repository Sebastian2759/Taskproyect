import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @ViewChild('dlg') dlg!: ElementRef<HTMLDialogElement>;

  title = 'Confirmación';
  message = '¿Seguro?';

  private resolveFn: ((v: boolean) => void) | null = null;

  ask(title: string, message: string): Promise<boolean> {
    this.title = title;
    this.message = message;

    this.dlg.nativeElement.showModal();

    return new Promise<boolean>(resolve => {
      this.resolveFn = resolve;
    });
  }

  confirm() { this.close(true); }
  cancel() { this.close(false); }

  private close(result: boolean) {
    this.dlg.nativeElement.close();
    this.resolveFn?.(result);
    this.resolveFn = null;
  }
}
