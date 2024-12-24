package com.wonlinestore.backend.service;

import com.wonlinestore.backend.dto.UserDto;
import com.wonlinestore.backend.entity.User;
import com.wonlinestore.backend.repository.UserRepo;
import com.wonlinestore.backend.util.VarList;
import com.wonlinestore.backend.util.mapper.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;

    public UserDto getUserByUsername(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return userMapper.toDto(user);
        }else{
            return null;
        }

    }
    //user register
    public UserDto saveUser(UserDto userDto) {
        String encodedPW = new BCryptPasswordEncoder(12).encode(userDto.getPassword());
        userDto.setPassword(encodedPW);
        try {
            User saved = userRepo.save(userMapper.toEntity(userDto));
            var r= userMapper.toDto(saved);
            System.out.println("mapped"+r);
            return r;
        } catch (Exception e) {
           return null;
        }

    }

    public String verifyUser(UserDto userDto) {
        Authentication authenticate = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));

        if (authenticate.isAuthenticated()) {
            return jwtService.generateToken(userDto.getUsername());
        }
        else{
            return String.valueOf(VarList.UNAUTHORIZED);
        }
    }
}
