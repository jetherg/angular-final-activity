import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  isLogged: any;
  ticketList: any;
  constructor(private _globalService: GlobalService) {}

  ngOnInit(): void {
    this._globalService.isLogged.subscribe((logged: any) => {
      this.isLogged = logged;
    });
    this._globalService.checkLogStatus();
    if (this.isLogged) {
      this._globalService.httpGetTickets();
      this._globalService.onHttpGetTickets.subscribe((tickets: any) => {
        this.ticketList = tickets;
      });
    }
  }
}
