package com.luv2code.ecommerce.entity.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl  implements CheckoutService{
    private CustomerRepository customerRepository;
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve订单从dto
        Order order=purchase.getOrder();
        //生成tracking号
        String orderTrackingNumber=generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order with orderItems
        Set<OrderItem> orderItems=purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        //populate order with两个地址
        order.setBilliingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //populate customer
        Customer customer=purchase.getCustomer();
        customer.add(order);
        //保存到数据库
        customerRepository.save(customer);
        //返回response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID号
        return UUID.randomUUID().toString();
    }
}
