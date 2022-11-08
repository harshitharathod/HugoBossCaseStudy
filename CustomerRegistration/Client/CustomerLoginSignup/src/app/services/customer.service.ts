import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  //add customer
  public addCustomer(customer: any){
    return this.httpClient.post(`/api/postCustomer`, customer)
  }

  //registering with google
  public googleSignup(){
    console.log('Inside service');
    return this.httpClient.get(`/oauth2/authorization/google`)
  }
}
