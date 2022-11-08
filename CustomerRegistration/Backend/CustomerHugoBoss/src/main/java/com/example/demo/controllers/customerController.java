package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Customer;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.services.CustomerService;



@CrossOrigin
@RestController
@Controller
@RequestMapping("/api")
public class customerController {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private CustomerService customerService;

	@GetMapping("/getCustomers")
	public List<Customer> getAllCustomer() {
		return customerRepository.findAll();
	}
	@GetMapping("/getCustomer/{id}")
	public Optional<Customer> getCustomer(@PathVariable Long id) {
		return customerRepository.findById(id);
	}

	@PostMapping("/postCustomer")
	public Customer createCustomer(@RequestBody Customer customer) throws Exception {
		customer.setPassword(this.bCryptPasswordEncoder.encode(customer.getPassword()));
		
		return this.customerService.createCustomer(customer);
	}

	@PutMapping("/putCustomer")
	public Customer updateCustomer(@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}

	@DeleteMapping("/deleteCustomer")
	public void deleteCustomer(@RequestBody Customer customer) {
		customerRepository.delete(customer);;
	}

}
