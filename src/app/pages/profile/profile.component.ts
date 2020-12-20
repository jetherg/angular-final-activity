import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from './profile-model';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _globalService:GlobalService, private route:Router,private title: Title) { }

  profileForm: any;

  profiles: Profile = {
    email:'',
    first_name:'',
    last_name:'',
    alias:'',
    job_title:'',
    mobile_number:'',
    password:''
  };

  ngOnInit(): void {
    this.title.setTitle('My Ticket | Profile');
    this._globalService.httpGetProfile();

    if (this._globalService.getToken() === null || this._globalService.getToken() == ''){
      this.route.navigate(['/']);
    }

    this._globalService.onHttpGetProfile.subscribe(
      (profile:any) => {
        this.fillForm(profile);
      }
    );
    this.profileForm = new FormGroup({
      email:new FormControl('test@test.com',[Validators.required,Validators.email]),
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      alias:new FormControl('',[Validators.required]),
      job_title:new FormControl('',[Validators.required]),
      password:new FormControl(''),
      confirm_password:new FormControl(''),
      mobile_number:new FormControl('',[Validators.required])
    });
  }

  fillForm(data:any):void{
    this.profileForm.patchValue({
      email: data.email,
      first_name: data.meta.first_name,
      last_name: data.meta.last_name,
      alias: data.alias,
      job_title: data.meta.job_title,
      mobile_number: data.meta.mobile_number,
    });
  }

  onSubmit():void {
    console.log('valid form',this.profileForm.valid);
    console.log('profile form',this.profileForm.value);

    if (this.profileForm.valid){

      const formValues = this.profileForm.value;
      const newFormValues = {
        meta:{
          first_name:formValues.first_name,
          last_name:formValues.last_name,
          job_title:formValues.job_title,
          mobile_number:formValues.mobile_number,
          timezone:'Asia/Manila'
        },
        current_password:'',
        email:formValues.email,
        alias:formValues.alias,
      };
      this._globalService.httpUpdateProfile(newFormValues);
    } else {
      alert('Invalid Form!')
    }

  }


}
