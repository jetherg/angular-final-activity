import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Login } from '../pages/login/login-model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  onHttpGetTickets = new Subject();

  constructor(private http: HttpClient) {}

  httpLogin(logins: Login) {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this.http.post(url, logins).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        }
      },
      (error) => {
        console.log('error response: httpLogin', error);
        Swal.fire('Error', 'Please check your credentials', 'error');
      }
    );
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http
      .get(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.onHttpGetProfile.next(response.data);
          }
        },
        (error) => {
          console.log('error response: httpGetProfile', error);
          this.onHttpGetProfile.next('');
        }
      );
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http
      .put(url, data, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.onHttpUpdateProfile.next(response.data);
            this.onHttpGetProfile.next(response.data);
            Swal.fire('Success', 'Your profile is now updated', 'success');
          }
        },
        (error) => {
          console.log('error response: httpGetProfile', error);
          Swal.fire('Error', 'Unable to update your profile', 'error');
        }
      );
  }

  httpGetTickets(): void {
    const url =
      'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my?exclude_signature=1';
    const token = this.getToken();

    this.http
      .get(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.onHttpGetTickets.next(response.data);
          }
        },
        (error) => {
          console.log('error response: httpGetTickets', error);
          Swal.fire('Error', 'Unable to get your tickets', 'error');
        }
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token || ''; // return token;
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
