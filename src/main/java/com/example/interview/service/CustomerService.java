package com.example.interview.service;

import com.example.interview.domain.Customer;

import java.util.List;

public interface CustomerService {
    Customer getCustomer(Long customerId);

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Customer customer);

    void deleteCustomer(Long customerId);

    List<Customer> getAllCustomers();
}
