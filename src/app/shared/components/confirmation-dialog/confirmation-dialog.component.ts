import { Component, inject, model } from '@angular/core';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    AppMaterialModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);
  readonly animal = model(this.data);

  public onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

  public onNoClick(result: boolean): void {
    this.dialogRef.close(result);
  }

}
