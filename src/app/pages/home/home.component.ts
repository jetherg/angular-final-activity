import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: any;
  staffName = '';
  constructor(private _globalService : GlobalService,private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('My Ticket | Home');
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    )
    this._globalService.checkLogStatus();

    if (this.isLogged) {
      this._globalService.httpGetProfile();
      this._globalService.onHttpGetProfile.subscribe(
        (profile: any) => {
          this.staffName = profile.alias;
        }
      )
    }
  }

}
