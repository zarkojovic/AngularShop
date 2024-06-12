import {Component, inject} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.component.html',

})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
