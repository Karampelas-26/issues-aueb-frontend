import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordRequest } from 'src/app/interface/ForgotPasswordRequest';
import { ResetPasswordRequest } from 'src/app/interface/ResetPasswordRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  hide = true;
  hideC = true;

  hasSendOTP = false;

  forgotPassword: ForgotPasswordRequest = {
    email: ''
  }

  resetPassword: ResetPasswordRequest = {
    email: '',
    otp: '',
    password: ''
  }

  checkPassword = '';

  isLoggedIn!: boolean;

  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.isLoggedIn = this.auth.getLoggedIn();

    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    })
    if(this.isLoggedIn) {
      this.auth.redirectUser();
    }
  }

  onForgotPassword() {
    this.auth.forgotPassword(this.forgotPassword).subscribe({
      next: (response: any) => {
        console.log(response);
        this.hasSendOTP = !this.hasSendOTP;
        this.resetPassword.email = '';
        this.snackBar.open(response.message, "Close", {
          duration: 3000
        });
      },
      error: (err) => {
        this.snackBar.open(err.error.message, "Close", {
          duration: 3000
        });
        console.error(err);
      }
    })
  }

  onResetPassword() {
    if(this.checkPassword !== this.resetPassword.password) {
      this.snackBar.open('Error: Οι κωδικοί πρόσβασης δεν ταιριάζουν.', "Close", {
        duration: 3000
      });
      console.error("Οι κωδικοί πρόσβασης δεν ταιριάζουν.")
    }
    this.resetPassword.email = this.forgotPassword.email;
    this.auth.resetPassword(this.resetPassword).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.message, "Close", {
          duration: 3000
        });
        console.log(res);
        this.resetPassword.email = '';
        this.resetPassword.password = '';
        this.resetPassword.otp = '';
        this.checkPassword = '';
      },
      error: (err) => {
        this.snackBar.open(err.error.message, "Close", {
          duration: 3000
        });
        console.error(err);

      }
    })
  }


  //sta error messages ena p me chrome kai message me ngmodel gia bind me oti thes error apo ts

}
