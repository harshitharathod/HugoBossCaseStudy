package com.example.demo.config;

import java.io.IOException;
import java.net.http.HttpHeaders;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.services.impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private JwtUtils jwtutil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String requestTokenHeader = request.getHeader("Authorization");
		System.out.println(requestTokenHeader);
		String username=null;
		String jwtToken=null;
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken=requestTokenHeader.substring(7);
			
			try{
			username= this.jwtutil.extractUsername(jwtToken);
			}catch(ExpiredJwtException e) {
				System.out.println("jwt token is expired");
			}catch(Exception e) {
				e.printStackTrace();
				System.out.println("Error!!");
			}
		
			
		}else {
			System.out.println("Invalid token, not starting with bearer");
		}
		
		//validated
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			final UserDetails userDetails= this.userDetailsService.loadUserByUsername(username);
			if(this.jwtutil.validateToken(jwtToken,userDetails)) {
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationtoken= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));;
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationtoken);
			}
		}
		else {
			System.out.println("Token is not valid");
		}
		filterChain.doFilter(request, response);
	}
	
	
	
	

}
