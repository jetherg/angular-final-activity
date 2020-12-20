import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  staffImage = '';
  staffName = '';
  staffJob = '';
  staffEmail = '';
  staffMobile = '';
  staffProfile: any;
  isLogged: any;
  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    );
    this._globalService.checkLogStatus();

    if (this.isLogged) {
      this._globalService.onHttpGetProfile.subscribe(
        (profile: any) => {
          this.staffProfile = profile;
        }
      );
      this._globalService.httpGetProfile();
    }
  }

}
