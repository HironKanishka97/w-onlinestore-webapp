package com.wonlinestore.backend.service;

import com.wonlinestore.backend.dto.ClientOrderDto;
import com.wonlinestore.backend.entity.CartItem;
import com.wonlinestore.backend.entity.ClientOrder;
import com.wonlinestore.backend.repository.ClientOrderRepo;
import com.wonlinestore.backend.repository.ProductRepo;
import com.wonlinestore.backend.util.VarList;
import com.wonlinestore.backend.util.mapper.ClientOrderMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class ClientOrderService {

    @Autowired
    private ClientOrderRepo clientOrderRepo;
    @Autowired
    private ClientOrderMapper clientOrderMapper;
    @Autowired
    private ProductRepo productRepo;


    public List<ClientOrderDto> getAllClientOrders() {
        try {
            List<ClientOrder> clientOrderList = clientOrderRepo.findAll();
//            System.out.println( clientOrderMapper.clientOrderListToDtoList(clientOrderList));
            return clientOrderMapper.clientOrderListToClientOrderDtoList(clientOrderList);
        } catch (Exception e) {
            return null;
        }
    }


    public ClientOrderDto getClientOrder(int id) {
        try {
            ClientOrder clientOrder = clientOrderRepo.findById(id).orElse(null);
            if (clientOrder != null) {
                return clientOrderMapper.clientOrderToClientOrderDto(clientOrder);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public int saveClientOrder(ClientOrderDto clientOrderdto) {
        try {
            ClientOrder clientOrder1 = clientOrderMapper.clientOrderDtoToClientOrder(clientOrderdto);
            //bl
            for (CartItem cartItem : clientOrder1.getCartItems()) {
                int productId = cartItem.getProduct().getId();
                int availableQty = productRepo.getCurrentQuantity(productId);
                int quantity = cartItem.getProductCount();
                if (availableQty == 0 || availableQty - quantity <= 0) {
                    System.out.println(cartItem.getProduct().getName()+" : out of stock");
                    return VarList.BAD_REQUEST;
                } else {
                    productRepo.updateQuantity(productId, quantity);
                }
            }
            ClientOrder clientOrder = clientOrderRepo.save(clientOrder1);
            return VarList.CREATED;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public int updateClientOrder(int id, ClientOrderDto clientOrderdto) {
        try {
            boolean b = clientOrderRepo.existsById(id);
            ClientOrder clientOrder = clientOrderRepo.findById(id).orElse(null);
            if (b) {
                ClientOrder clientOrder1 = clientOrderMapper.clientOrderDtoToClientOrder(clientOrderdto);
                //bl
                for (CartItem cartItem : clientOrder1.getCartItems()) {
                    int productId = cartItem.getProduct().getId();
                    for (CartItem ci : clientOrder.getCartItems()) {
                        int currentOrderProductCount = ci.getProductCount();
                        int availableQtyInProduct = productRepo.getCurrentQuantity(productId);
                        int quantityToUpdate = cartItem.getProductCount();
                        int diff = currentOrderProductCount - quantityToUpdate;

                        if (availableQtyInProduct == 0 || availableQtyInProduct - diff <= 0) {
                            System.out.println(cartItem.getProduct().getName()+" : out of stock");
                            return VarList.BAD_REQUEST;
                        } else {
                            productRepo.updateQuantityAfterClientOrderUpdate(productId, diff);
                        }
                    }
                }
                ClientOrder save = clientOrderRepo.save(clientOrder1);
                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }

        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteClientOrder(int id) {
        try {
            ClientOrder co = clientOrderRepo.findById(id).orElse(null);
            //bl
            if (co != null) {
                for (CartItem cartItem : co.getCartItems()) {
                    int quantityToIncrease = cartItem.getProductCount();
                    productRepo.updateQuantityAfterClientOrderDelete(id, quantityToIncrease);
                }
            }
            clientOrderRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
