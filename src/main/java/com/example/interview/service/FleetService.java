package com.example.interview.service;

import com.example.interview.domain.Fleet;

import java.util.List;

public interface FleetService {
    Fleet getFleet(Long fleetId);

    Fleet createFleet(Fleet fleet);

    Fleet updateFleet(Fleet fleet);

    void deleteFleet(Long fleetId);

    List<Fleet> getAllFleets();
}
