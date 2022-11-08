package com.example.demo.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Customer;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.services.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private  CustomerRepository customerRepository;

	// creating customer
	@Override
	public Customer createCustomer(Customer customer) throws Exception {
		
		Customer local=this.customerRepository.findByUsername(customer.getUsername());
		if(local!=null) {
			System.out.println("Customer already exists");
			throw new Exception("Customer already present");
		}
		else {
			local=this.customerRepository.save(customer);
		}
		return local;
	}

}
