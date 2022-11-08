import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'material-login';
  constructor(private router: Router, private formbuilder: FormBuilder, private snack: MatSnackBar, private loginService: LoginService) { }
  public login = {
    username: '',
    password: '',
  }

  loginForm!: FormGroup;
  hide = true;
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      'username': [this.login.username, [
        Validators.required,
        Validators.minLength(5)
      ]],
      'password': [this.login.password, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        )
      ]],

    })
  }
  formSubmit(formDirective: FormGroupDirective) {
    if (!this.loginForm.valid) {
      return;
    }
    
    //request the server to generate token
    this.loginService.generateToken(this.login).subscribe(
      (data: any) => {
        //success
        console.log(data),
          this.snack.open('Success!!', '', {
            duration: 3000
          })
          this.loginService.loginCustomer(data.token);
          this.loginService.getCurrentCustomer().subscribe(
            (customer:any)=>{
              this.loginService.setCustomer(customer);
              console.log(customer);

              //redirect
              if(this.loginService.isLoggedIn()){
                this.router.navigateByUrl('/dashboard');
              }

              else{
                this.loginService.logout();
              }
              
            }
          )
        

      },
      (error: any) => {
        console.log(this.login);
        this.snack.open('Invalid Credentials!! Try again', '', {
          duration: 3000
        })
      })
      formDirective.resetForm();
    this.loginForm.reset();

  }



}