package com.wonlinestore.backend.util.mapper;


import com.wonlinestore.backend.dto.ClientOrderDto;
import com.wonlinestore.backend.entity.ClientOrder;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientOrderMapper {
   ClientOrderDto clientOrderToClientOrderDto(ClientOrder clientOrder);
   ClientOrder clientOrderDtoToClientOrder(ClientOrderDto clientOrderDto);
   List<ClientOrderDto> clientOrderListToClientOrderDtoList(List<ClientOrder> clientOrderList);
}
