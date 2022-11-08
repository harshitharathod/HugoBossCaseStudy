import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormBuilder, Validators, Form, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  constructor(private customerService: CustomerService, private snack: MatSnackBar, private formbuilder: FormBuilder) { }

  public customer = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
  }
  registerForm!: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      'username': [this.customer.username, [
        Validators.required,
        Validators.minLength(5)
      ]],
      'firstName': [this.customer.firstName, [
        Validators.required
      ]],
      'lastName': [this.customer.lastName, [
        Validators.required
      ]],
      'email': [this.customer.email, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
        )
      ]],
      'address': [this.customer.address, [
        Validators.required
      ]],
      'password': [this.customer.password, [
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
    if (!this.registerForm.valid) {
      return;
    }
    //add customer
    this.customerService.addCustomer(this.customer).subscribe(
      (data: any) => {
        //success
        // console.log(data),
          Swal.fire('Successfully registeration is done!!', 'Customer id is '+data.id , 'success');

      },
      (error: any) => {
        this.snack.open('Something went wrong!!', '', {
          duration: 3000
        })
      })
    formDirective.resetForm();
    this.registerForm.reset();
    
  }
  clearForm() {
    this.registerForm.reset();
  }

  



}



