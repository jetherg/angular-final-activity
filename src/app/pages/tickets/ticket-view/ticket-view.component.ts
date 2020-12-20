import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css'],
})
export class TicketViewComponent implements OnInit {
  isLogged: any;
  ticket: any;
  ticketList: any;
  constructor(
    private _globalService: GlobalService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._globalService.isLogged.subscribe((logged: any) => {
      this.isLogged = logged;
    });
    this._globalService.checkLogStatus();
    if (this.isLogged) {
      this._globalService.httpGetTickets();
      this._globalService.onHttpGetTickets.subscribe((tickets: any) => {
        this.ticketList = tickets;
        this.router.params.subscribe((params: Params) => {
          const id = params.id;
          const selected = this.ticketList.filter((ticket: any) => {
            return ticket.id === id;
          });
          if (selected.length > 0) {
            this.ticket = selected[0];
          }
        });
      });
    }
  }
}
