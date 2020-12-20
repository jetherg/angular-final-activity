import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  isLogged: any;
  constructor(private _globalService : GlobalService, private route: Router) { }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    );
    this._globalService.checkLogStatus();
    if (!this.isLogged) {
      Swal.fire(
        'Error',
        'You are not authorized to access this page',
        'error'
      );
      this.route.navigate(['/']);
    }
  }

}
