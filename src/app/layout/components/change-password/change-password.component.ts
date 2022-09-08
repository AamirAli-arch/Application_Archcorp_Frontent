import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { ChangePasswordService } from './services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder,public _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    public _changePasswordService: ChangePasswordService,private _messageNotification:MessageNotifierService,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'oldPassword': [null, [Validators.required]],
      'newPassword': [null, [Validators.required, Validators.minLength(6)]],
      'confrimNewPassword': [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(post) {
    this.post = post;
    this._changePasswordService.changePassword(this.post).subscribe(resp => {
      this._messageNotification.successMessage("Password Updated");
      this.dialogRef.close();
    },error => {
        this._messageNotification.errorMessage("Unable to update password");
    })
  }

}
