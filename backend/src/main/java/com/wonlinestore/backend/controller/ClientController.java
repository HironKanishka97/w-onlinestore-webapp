package com.wonlinestore.backend.controller;

import com.wonlinestore.backend.dto.ClientDto;
import com.wonlinestore.backend.dto.response.ResponseDto;
import com.wonlinestore.backend.service.ClientService;
import com.wonlinestore.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/client/")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("getAllClients")
    public ResponseEntity<ResponseDto> getAllClients() {
        List<ClientDto> allClients = clientService.getAllClients();

        if (allClients != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", allClients), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getClient/{id}")
    public ResponseEntity<ResponseDto> getClient(@PathVariable int id) {
        ClientDto client = clientService.getClient(id);

        if (client != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "fetched successfully", client), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("saveClient")
    public ResponseEntity<ResponseDto> saveClient(@RequestBody ClientDto clientdto) {
        System.out.println(clientdto);        ClientDto client = clientService.saveClient(clientdto);
        if (client != null) {
            return new ResponseEntity<>(new ResponseDto(VarList.CREATED, "saved successfully", client), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("updateClient/{id}")
    public ResponseEntity<ResponseDto> updateClient(@PathVariable int id, @RequestBody ClientDto clientdto) {
        int code = clientService.updateClient(id, clientdto);
        if (code == VarList.OK) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "updated successfully", clientdto), HttpStatus.OK);
        } else if (code == VarList.NOT_FOUND) {
            return new ResponseEntity<>(new ResponseDto(VarList.NOT_FOUND, "Client Not Found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("deleteClient/{id}")
    public ResponseEntity<ResponseDto> deleteClient(@PathVariable int id) {
        boolean isDeleted = clientService.deleteClient(id);
        if (isDeleted) {
            return new ResponseEntity<>(new ResponseDto(VarList.OK, "deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto(VarList.INTERNAL_SERVER_ERROR, "Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
