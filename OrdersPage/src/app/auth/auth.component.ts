import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup | undefined;
  constructor(
    public fb: FormBuilder,
    public auth : AuthService,
    public router: Router
  ) { 

  }

  ngOnInit(): void {
    this.createForm();

  }
  createForm(){
   this.loginForm = this.fb.group({
     email : ['' , [Validators.required,Validators.email]],
     password : ['' ,[Validators.required]],
   })
  }

  login(){
    if(this.loginForm) {
          this.auth.login();
          this.router.navigateByUrl("/orders");

    }
  
  }

}
