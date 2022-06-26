package com.example.interview.bootstrap;

import com.example.interview.domain.*;
import com.example.interview.repository.CustomerRepository;
import com.example.interview.repository.FleetRepository;
import com.example.interview.repository.OrderRepository;
import com.example.interview.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Bootstrap implements CommandLineRunner {
    private RoleRepository repository;
    private CustomerRepository customerRepository;
    private FleetRepository fleetRepository;
    private OrderRepository orderRepository;

    @Override
    public void run(String... args) throws Exception {
        Role user = new Role(ERole.ROLE_USER);
        Role moderator = new Role(ERole.ROLE_MODERATOR);
        Role admin = new Role(ERole.ROLE_ADMIN);
        repository.save(user);
        repository.save(moderator);
        repository.save(admin);

        Customer customer1 = new Customer(1L, "Peter", "peter@gmail.com", "0700123456");
        Customer customer2 = new Customer(2L, "John", "john@gmail.com", "0700123456");
        Customer customer3 = new Customer(3L, "Kevin", "kevin@gmail.com", "0700123456");
        customerRepository.save(customer1);
        customerRepository.save(customer2);
        customerRepository.save(customer3);

        Fleet fleet1 = new Fleet(1L, "BMW", "Loading");
        Fleet fleet2 = new Fleet(2L, "Audi", "Available");
        Fleet fleet3 = new Fleet(3L, "Mercedes", "Loading");
        fleetRepository.save(fleet1);
        fleetRepository.save(fleet2);
        fleetRepository.save(fleet3);

        Order order1 = new Order(1L, "1", "Loading", "", customer1, fleet1);
        Order order2 = new Order(2L, "2", "Loading", "", customer2, fleet2);
        Order order3 = new Order(3L, "3", "Pending", "", customer3, fleet3);
        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);

    }
}
