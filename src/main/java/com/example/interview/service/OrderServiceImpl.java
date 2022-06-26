package com.example.interview.service;

import com.example.interview.domain.Order;
import com.example.interview.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public Order updateOrder(Order order) {
        Order orderToUpdate = orderRepository.findById(order.getId()).orElse(null);
        if (orderToUpdate != null) {
            orderToUpdate.setStatus(order.getStatus());
            orderToUpdate.setOrderNumber(order.getOrderNumber());
            orderToUpdate.setDescription(order.getDescription());
            return orderRepository.save(orderToUpdate);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.findById(orderId).ifPresent(orderRepository::delete);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
