package com.example.demo.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.JwtUtils;
import com.example.demo.models.Customer;
import com.example.demo.models.JwtRequest;
import com.example.demo.models.JwtResponse;
import com.example.demo.services.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin
public class AuthenticateController {
	
	
	@Autowired
	private AuthenticationManager authenticationManager; 
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService; 
	
	@Autowired
	private JwtUtils jwtutils;
	
	
	//generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?>generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		
		try {
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			
		}catch(UsernameNotFoundException e){
			e.printStackTrace();
			throw new Exception("User not found!!");
		}
		
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtutils.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
		
	}
	
	@GetMapping("/prevent")
	public Principal prevent(Principal principal) {
		return principal;
	}
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}catch(DisabledException e){
			throw new Exception("User disabled");	
		}catch(BadCredentialsException e) {
				throw new Exception("Invalid Credentials" + e.getMessage());
		}
	}
	// Returns the details of current customer
	@GetMapping("/current-customer")
	public Customer getCurrentCustomer(Principal principal){
		
		return ((Customer)this.userDetailsService.loadUserByUsername(principal.getName()));
		
		
	}
}
