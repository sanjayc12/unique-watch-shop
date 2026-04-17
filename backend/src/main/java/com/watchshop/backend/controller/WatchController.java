package com.watchshop.backend.controller;

import com.watchshop.backend.model.Watch;
import com.watchshop.backend.service.WatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watches")
@CrossOrigin(origins = "http://localhost:5173") // Default Vite port
public class WatchController {

    @Autowired
    private WatchService watchService;

    @GetMapping
    public List<Watch> getAllWatches() {
        return watchService.getAllWatches();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Watch> getWatchById(@PathVariable Long id) {
        return watchService.getWatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Watch createWatch(@RequestBody Watch watch) {
        return watchService.saveWatch(watch);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Watch> updateWatch(@PathVariable Long id, @RequestBody Watch watch) {
        return watchService.getWatchById(id)
                .map(existing -> {
                    watch.setId(id);
                    return ResponseEntity.ok(watchService.saveWatch(watch));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatch(@PathVariable Long id) {
        watchService.deleteWatch(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public List<Watch> getWatchesByCategory(@PathVariable String category) {
        return watchService.getWatchesByCategory(category);
    }
}
