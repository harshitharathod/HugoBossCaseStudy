import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  isLoggedIn=false;
  customer=null

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.loginService.isLoggedIn();
    this.customer= this.loginService.getCustomer();
  }

  public logout(){
    this.loginService.logout();
    this.isLoggedIn=false;
    this.customer=null;
    window.location.reload();

  }

}
