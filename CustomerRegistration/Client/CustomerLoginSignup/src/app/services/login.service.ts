import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public customer = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
  }

  constructor(private httpClient: HttpClient) { }
  // Current customer who is loggedin
  public getCurrentCustomer(){
    return this.httpClient.get(`/current-customer`)
  }

  public generateToken(login: any) {
    return this.httpClient.post(`/generate-token`, login)
  }

  //login customer : set token in local storage
  public loginCustomer(token: any) {
    localStorage.setItem('token', token)
    return true;

  }

  //isLogin : user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token")
    if (tokenStr == undefined || tokenStr == "" || tokenStr == null) {
      return false;
    }
    else{
      return true;
    }
  }

  //Logout : remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem('token');
  }

  // set Customer details
  public setCustomer(customer : any){
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  // get Customer
  public getCustomer(){
    let custStr=localStorage.getItem('customer')
    console.log(custStr);
    if(custStr!=null){
      return JSON.parse(custStr)
    }
    else{
      this.logout();
      return null;
    }
  }

}
