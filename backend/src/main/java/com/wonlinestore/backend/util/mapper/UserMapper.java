package com.wonlinestore.backend.util.mapper;

import org.mapstruct.Mapper;
import com.wonlinestore.backend.dto.UserDto;
import com.wonlinestore.backend.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    User toEntity(UserDto userDto);

//    List<UserDto> userListToDtoList(List<User> userList);


}