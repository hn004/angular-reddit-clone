import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;
  // authService: any;

  constructor(private authService: AuthService, private toastr: ToastrService,private router: Router) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''

    }
  }
  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
    .subscribe(()=>{
      this.router.navigate(['/login'],
      { queryParams: { registered: 'true' } });
      // console.log(data);
    }, ()=>{
      this.toastr.error('Registration Failed');
      
    }
      );
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

}
