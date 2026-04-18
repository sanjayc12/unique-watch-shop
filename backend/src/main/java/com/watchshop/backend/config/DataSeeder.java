package com.watchshop.backend.config;

import com.watchshop.backend.model.User;
import com.watchshop.backend.repository.UserRepository;
import com.watchshop.backend.model.Watch;
import com.watchshop.backend.repository.WatchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner commandLineRunner(WatchRepository watchRepository, UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User(null, "sanjay", "sanjay123", "sanjay@unique.com", "ADMIN"));
                userRepository.save(new User(null, "admin", "admin123", "admin@unique.com", "USER"));
            }

            if (watchRepository.count() == 0) {
                Watch w1 = new Watch(null, "Rolex Submariner", "Rolex", new BigDecimal("12000.00"), "Classic diving watch with automatic movement.", "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800", 5, "Luxury", 4.9, "The ultimate statement piece. Accurate and robust.");
                Watch w2 = new Watch(null, "Omega Seamaster", "Omega", new BigDecimal("5500.00"), "Professional diver watch with co-axial escapement.", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800", 8, "Luxury", 4.8, "Perfect balance of elegance and performance.");
                Watch w3 = new Watch(null, "Seiko Prospex", "Seiko", new BigDecimal("450.00"), "Durable automatic watch for daily wear.", "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?auto=format&fit=crop&q=80&w=800", 15, "Sport", 4.6, "Incredible value for a genuine dive watch.");
                Watch w4 = new Watch(null, "Tissot Le Locle", "Tissot", new BigDecimal("600.00"), "Elegant dress watch with Swiss movement.", "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800", 10, "Classic", 4.7, "Sophisticated and reliable. Great for formal events.");
                Watch w5 = new Watch(null, "Casio G-Shock", "Casio", new BigDecimal("120.00"), "Tough digital watch for extreme conditions.", "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=800", 20, "Sport", 4.9, "Indestructible. The perfect outdoor companion.");

                watchRepository.saveAll(List.of(w1, w2, w3, w4, w5));
            }
        };
    }
}
