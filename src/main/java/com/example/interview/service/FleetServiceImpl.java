package com.example.interview.service;

import com.example.interview.domain.Fleet;
import com.example.interview.repository.FleetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FleetServiceImpl implements FleetService {
    private final FleetRepository fleetRepository;

    @Override
    public Fleet getFleet(Long fleetId) {
        return fleetRepository.findById(fleetId).orElse(null);
    }

    @Override
    public Fleet createFleet(Fleet fleet) {
        return fleetRepository.save(fleet);
    }

    @Override
    public Fleet updateFleet(Fleet fleet) {
        Fleet existingFleet = fleetRepository.findById(fleet.getId()).orElse(null);
        if (existingFleet == null) {
            return null;
        } else {
            existingFleet.setStatus(fleet.getStatus());
            existingFleet.setRegistrationNumber(fleet.getRegistrationNumber());
            return fleetRepository.save(existingFleet);
        }
    }

    @Override
    public void deleteFleet(Long fleetId) {
        fleetRepository.findById(fleetId).ifPresent(fleetRepository::delete);
    }

    @Override
    public List<Fleet> getAllFleets() {
        return fleetRepository.findAll();
    }
}
