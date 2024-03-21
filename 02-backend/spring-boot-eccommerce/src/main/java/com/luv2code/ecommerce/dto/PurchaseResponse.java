package com.luv2code.ecommerce.dto;

import lombok.Data;

@Data  //这个会自动给final属性生成构造函数
public class PurchaseResponse {
    private final String orderTrackingNumber; //final对象创建后不能被更改

}
