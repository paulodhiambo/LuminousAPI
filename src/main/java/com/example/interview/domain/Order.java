package com.example.interview.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String orderNumber;
    @NotNull
    private String status;
    @NotNull
    private String description;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer customer;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Fleet fleet;
}
