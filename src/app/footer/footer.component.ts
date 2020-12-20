import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
}
