package com.wonlinestore.backend.controller;
//
//import com.wonlinestore.backend.dto.UserDto;
//import com.wonlinestore.backend.dto.response.ResponseDto;
//import com.wonlinestore.backend.dto.response.TokenResponse;
//import com.wonlinestore.backend.service.UserService;
//import com.wonlinestore.backend.util.VarList;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import com.wonlinestore.backend.dto.UserDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.dto.response.TokenResponse;
import com.wonlinestore.backend.service.UserService;
import com.wonlinestore.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/user/")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping(value = "registerUser")
    public ResponseEntity<ResponseDto> saveUser(@RequestBody UserDto userDto) {
        UserDto savedUserDto= userService.saveUser(userDto);
        if (savedUserDto!=null) {
            var r= new ResponseEntity<>(
                    new ResponseDto(VarList.CREATED, "User Saved Successfully",savedUserDto)
                    , HttpStatus.CREATED);
            System.out.println(r);
            return r;
        }else{
            return new ResponseEntity<>(
                    new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "User Not Saved Successfully",userDto)
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(value = "login")
    public ResponseEntity<ResponseDto> userLogin(@RequestBody UserDto userDto) {
        String res= userService.verifyUser(userDto);
        if (!res.equals(String.valueOf(VarList.UNAUTHORIZED))) {
            return new ResponseEntity<>(
                    new ResponseDto(VarList.OK, "User Verified Successfully", new TokenResponse(res))
                    , HttpStatus.OK);
        }else{
            return new ResponseEntity<>(
                    new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "User Not Verified Successfully",userDto)
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("getUser/{username}")
    public ResponseEntity<ResponseDto> getUserByUsername(@PathVariable String username) {
        UserDto dto = userService.getUserByUsername(username);
        if (dto != null) {
            return new ResponseEntity<>(
                    new ResponseDto(VarList.OK, "User fetched Successfully",dto)
                    , HttpStatus.OK);
        }else{
            return new ResponseEntity<>(
                    new ResponseDto(VarList.NOT_FOUND, "User Not Found")
                    , HttpStatus.OK);
        }

    }

}
