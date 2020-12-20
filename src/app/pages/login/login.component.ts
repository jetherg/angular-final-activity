import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logins: Login = {
    username: '',
    password: ''
  }
  loginForm: FormGroup;
  constructor(private _globalService : GlobalService, private route: Router,private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('My Ticket | Login');
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin():void {
    console.log(this.logins);
    if (this.loginForm.valid) {
      this._globalService.httpLogin(this.loginForm.value);
      this._globalService.onHttpLogin.subscribe(
        (response: any) => {
          const token = response.token;
          this._globalService.setToken(token);
          Swal.fire(
            'Logged In',
            'You are now logged in',
            'success'
          )
          this.route.navigate(['/']);
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Please check your credentials',
        'error'
      );
    }
  }
}
