package com.watchshop.backend.controller;

import com.watchshop.backend.repository.UserRepository;
import com.watchshop.backend.repository.WatchRepository;
import com.watchshop.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class StatsController {

    @Autowired
    private WatchRepository watchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", watchRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalOrders", orderRepository.count());
        
        // Simple calculation for sales
        double totalSales = orderRepository.findAll().stream().mapToDouble(o -> o.getPrice()).sum();
        stats.put("totalSales", totalSales);
        
        // Mocking chart data (could be grouped by date)
        stats.put("salesData", new int[]{12, 19, 3, 5, 2, 3, (int)orderRepository.count()}); 
        
        return stats;
    }
}
