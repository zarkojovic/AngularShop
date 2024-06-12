import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  sendMessage(): void {
    if (this.contactForm.valid) {
      // Form is valid, proceed with sending the message

      this.openDialog('0ms', '0ms');
      this.contactForm.reset();
    } else {
      // Form is invalid, update error messages
      this.openSnackBar();
    }
  }
}
