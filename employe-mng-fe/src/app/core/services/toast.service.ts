import { Injectable } from '@angular/core';
import { ToastMessage } from 'src/app/shared/components/global-toast/global-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

toasts: ToastMessage[] = [];

  constructor() { }

  showToast(toast: ToastMessage) {
    this.toasts.push(toast);
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }
}
