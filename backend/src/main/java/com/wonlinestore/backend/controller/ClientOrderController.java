package com.wonlinestore.backend.controller;

import com.wonlinestore.backend.dto.ClientOrderDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.service.ClientOrderService;
import com.wonlinestore.backend.util.VarList;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/clientOrder/")
public class ClientOrderController {

    private static final Logger log = LoggerFactory.getLogger(ClientOrderController.class);
    @Autowired
    private ClientOrderService clientOrderService;

    @GetMapping("getAllClientOrders")
    public ResponseEntity<ResponseDto> getAllClientOrders() {
        List<ClientOrderDto> allClientOrders = clientOrderService.getAllClientOrders();

        if (allClientOrders != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully",allClientOrders), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getClientOrder/{id}")
    public ResponseEntity<ResponseDto> getClientOrder(@PathVariable int id) {
        ClientOrderDto clientOrder = clientOrderService.getClientOrder(id);

        if (clientOrder != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully",clientOrder), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("saveClientOrder")
    public ResponseEntity<ResponseDto> saveClientOrder(@RequestBody ClientOrderDto clientOrderdto) {
        int code = clientOrderService.saveClientOrder(clientOrderdto);
        if (code==VarList.CREATED) {
            return new ResponseEntity<>(new ResponseDto(VarList.CREATED, "saved successfully",clientOrderdto), HttpStatus.CREATED);
        } else if (code==VarList.BAD_REQUEST) {
            return new ResponseEntity<>(new ResponseDto(VarList.BAD_REQUEST, "Product Out Of Stock / Low Product Quantity"), HttpStatus.BAD_REQUEST);
        } else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("updateClientOrder/{id}")
    public ResponseEntity<ResponseDto> updateClientOrder(
            @PathVariable int id,
            @RequestBody ClientOrderDto clientOrderdto) {

        int code= clientOrderService.updateClientOrder(id,clientOrderdto);
        if (code==VarList.OK) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "updated successfully",clientOrderdto), HttpStatus.OK);
        }else if (code==VarList.BAD_REQUEST) {
            return new ResponseEntity<>(new ResponseDto(VarList.BAD_REQUEST, "Product Out Of Stock / Low Product Quantity"), HttpStatus.BAD_REQUEST);
        }
        else if (code==VarList.NOT_FOUND) {
            return new ResponseEntity<>(new ResponseDto(VarList.NOT_FOUND, "Client order not found"), HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("deleteClientOrder/{id}")
    public ResponseEntity<ResponseDto> deleteClientOrder(@PathVariable int id) {
        boolean isDeleted= clientOrderService.deleteClientOrder(id);
        if (isDeleted) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "deleted successfully"), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
