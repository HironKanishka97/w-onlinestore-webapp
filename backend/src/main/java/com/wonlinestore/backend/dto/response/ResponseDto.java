package com.wonlinestore.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {
    private int code;
    private String message;
    private Object data;

    public ResponseDto(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
