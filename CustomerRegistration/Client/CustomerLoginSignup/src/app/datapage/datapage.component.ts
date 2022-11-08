import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../customer.model';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-datapage',
  templateUrl: './datapage.component.html',
  styleUrls: ['./datapage.component.css']
})
export class DatapageComponent implements OnInit
 {
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'address'];
  dataSource=null;
  customer=null
  CUSTOMER_DATA: Customer[] =[];


  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.customer= this.loginService.getCustomer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
