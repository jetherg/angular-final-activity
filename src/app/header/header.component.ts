import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: any;
  constructor(private _globalService: GlobalService, private route: Router) { }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    )
    this._globalService.checkLogStatus();
  }

  onLogout(): void {
    Swal.fire(
      'Logged Out!',
      'You are now logged out',
      'success'
    );
    this._globalService.deleteToken();
    this.route.navigate(['/']);

  }


}
