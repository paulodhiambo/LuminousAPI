package com.example.interview.service;


import com.example.interview.domain.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(Order order);

    Order getOrder(Long orderId);

    Order updateOrder(Order order);

    void deleteOrder(Long orderId);

    List<Order> getAllOrders();
}
