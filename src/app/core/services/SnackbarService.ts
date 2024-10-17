import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {StatusType} from "@models/enums/statusType";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, status: StatusType = StatusType.SUCCESS): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${status}`],
      duration: 3000,
    });
  }
}
