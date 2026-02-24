import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  type: ToastType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _msg = new BehaviorSubject<ToastMessage | null>(null);
  msg$ = this._msg.asObservable();

  success(text: string) { this.push('success', text); }
  error(text: string) { this.push('error', text); }
  info(text: string) { this.push('info', text); }

  private push(type: ToastType, text: string) {
    this._msg.next({ type, text });
    setTimeout(() => this._msg.next(null), 2500);
  }
}
