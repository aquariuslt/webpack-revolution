package com.ita.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/* Created by Jason Cui on 2017-08-29.*/
@RestController
public class ProxyValidateController {

  @GetMapping(value = "/api/v1/validate-string")
  ResponseEntity<String> validateString() {
    String validateInfo = "hello springboot backend";
    return new ResponseEntity<String>(validateInfo, HttpStatus.OK);
  }

  @GetMapping(value = "/api/v1/validate-json")
  ResponseEntity<SimpleResponse> validateJson() {
    return new ResponseEntity<SimpleResponse>(new SimpleResponse(), HttpStatus.OK);
  }


  class SimpleResponse {
    private boolean success;
    private String data;

    SimpleResponse() {
      this.success = true;
      this.data = "hello springboot backend";
    }

    public boolean isSuccess() {
      return success;
    }

    public void setSuccess(boolean success) {
      this.success = success;
    }

    public String getData() {
      return data;
    }

    public void setData(String data) {
      this.data = data;
    }
  }
}
