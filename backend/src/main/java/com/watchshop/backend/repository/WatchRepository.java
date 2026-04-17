package com.watchshop.backend.repository;

import com.watchshop.backend.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {
    List<Watch> findByCategory(String category);
    List<Watch> findByBrand(String brand);
}
