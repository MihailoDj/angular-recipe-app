import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../auth-response-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode; 
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    let authOsbervable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authOsbervable = this.authService.login(email, password);
    } else {
      authOsbervable = this.authService.signUp(email, password);
    }

    authOsbervable.subscribe(
      (responseData) => {
        console.log(responseData);
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
      }
    );

    authForm.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
