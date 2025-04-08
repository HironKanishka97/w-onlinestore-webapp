package com.wonlinestore.backend.filter;


import com.wonlinestore.backend.service.JWTService;
import com.wonlinestore.backend.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.context.ApplicationContext;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {
    @Autowired
    private JWTService jwtService;

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Skip JWT processing for registration and for login
        String path = request.getServletPath();
        if (path.equals("/api/v1/user/registerUser")|| path.equals("/api/v1/user/login") ){
            filterChain.doFilter(request, response);  // Continue without JWT validation
            return;
        }
        //  JWT token and process authentication for other requests
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtService.extractUserName(token);
//            System.out.println("username - "+username);

            if (jwtService.isTokenExpired(token)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token has expired.");
                return;
            }

        }

        //look if userName !=null and already not authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //getting userDetails
            //fetched from  MyUserDetailService bcz we need to pass non-empty UserDetails object
            UserDetails userDetails = applicationContext
                    .getBean(MyUserDetailService.class).loadUserByUsername(username);

            if (userDetails != null && jwtService.validateToken(token,userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                //setting req info on authToken
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //setting authentication object in context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        //continue filter
        filterChain.doFilter(request, response);
    }
}
