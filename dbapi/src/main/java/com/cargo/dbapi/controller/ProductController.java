package com.cargo.dbapi.controller;

import com.cargo.dbapi.model.Cargodb;
import com.cargo.dbapi.model.Payload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.cargo.dbapi.service.SearchService;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/search-cargo")
public class ProductController {
    @Autowired
    private SearchService service;
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    // Create a new cargo (JSON input)
    @PostMapping
    public ResponseEntity<List<Document>> searchCargo(@RequestBody Payload cargo) {
        List<Document> results;
        try {
            results =  service.findAllCargo(cargo);
            return ResponseEntity.ok(results);
        }catch (IllegalArgumentException e) {
            logger.error("Invalid input: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }




}