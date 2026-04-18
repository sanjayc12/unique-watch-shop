package com.watchshop.backend.service;

import com.watchshop.backend.model.Watch;
import com.watchshop.backend.repository.WatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchService {

    @Autowired
    private WatchRepository watchRepository;

    public List<Watch> getAllWatches() {
        return watchRepository.findAll();
    }

    public Optional<Watch> getWatchById(Long id) {
        return watchRepository.findById(id);
    }

    public Watch saveWatch(Watch watch) {
        return watchRepository.save(watch);
    }

    public void deleteWatch(Long id) {
        watchRepository.deleteById(id);
    }

    public List<Watch> getWatchesByCategory(String category) {
        return watchRepository.findByCategory(category);
    }
}
