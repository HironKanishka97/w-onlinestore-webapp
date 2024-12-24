package com.wonlinestore.backend.util.mapper;

import com.wonlinestore.backend.dto.ClientDto;
import com.wonlinestore.backend.entity.Client;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
   ClientDto clientToClientDto(Client client);
   Client clientDtoToClient(ClientDto clientDto);
   List<ClientDto> clientListToClientDtoList(List<Client> clientList);
}
