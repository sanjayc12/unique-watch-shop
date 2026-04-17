package com.watchshop.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "watches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Watch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private Integer stockAmount;
    
    private String category;

    @Column
    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String reviews; // Simplified for this example, could be a list of strings
}
