package com.example.interview.web.controller;

import com.example.interview.domain.Fleet;
import com.example.interview.service.FleetService;
import com.example.interview.web.model.Response;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fleet")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@AllArgsConstructor
public class FleetController {
    private FleetService fleetService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Response<Fleet>> getFleet(@PathVariable("id") Long id) {
        return ResponseEntity.ok(new Response<>("success", "", fleetService.getFleet(id)));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Response<List<Fleet>>> getAllFleets() {
        return ResponseEntity.ok(new Response<>("success", "", fleetService.getAllFleets()));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Response<Fleet>> createFleet(@RequestBody Fleet fleet) {
        return ResponseEntity.ok(new Response<>("success", "", fleetService.createFleet(fleet)));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Response<Fleet>> updateFleet(@PathVariable("id") Long id, @RequestBody Fleet fleet) {
        return ResponseEntity.ok(new Response<>("success", "", fleetService.updateFleet(fleet)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Response<Fleet>> deleteFleet(@PathVariable("id") Long id) {
        fleetService.deleteFleet(id);
        return ResponseEntity.noContent().build();
    }
}
