import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private snackbar = inject(MatSnackBar);

  success(message: string) {
    this.openSnackbar(message, 'OK', 'success-snackbar');
  }

  error(message: string) {
    this.openSnackbar(message, 'OK', 'error-snackbar');
  }

  private openSnackbar(
    message: string,
    action: string,
    className = '',
    duration = 5000,
  ) {
    this.snackbar.open(message, action, {
      duration,
      panelClass: [className],
    });
  }
}
