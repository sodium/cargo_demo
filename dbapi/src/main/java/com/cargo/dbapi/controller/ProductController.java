package com.cargo.dbapi.controller;

import com.cargo.dbapi.model.Cargodb;
import com.cargo.dbapi.model.Payload;
import com.cargo.dbapi.repository.CargodbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.cargo.dbapi.service.SearchService;
import org.bson.Document;


@RestController
@RequestMapping("/api/search-cargo")
public class ProductController {
    @Autowired
    private SearchService service;

        /*
    @GetMapping("/{id}")
    public ResponseEntity<Cargodb> getProductById(@PathVariable Long id) {
        Optional<Cargodb> optionalItem =  products.stream()
                .filter(product -> product.getCarrierCode().equals(id))
                .findFirst();

        return optionalItem.map(item -> ResponseEntity.ok(item))
                .orElse(ResponseEntity.notFound().build());
    }
     */

    // Create a new cargo (JSON input)
    @PostMapping
    public ResponseEntity<List<Document>> searchCargo(@RequestBody Payload cargo) {
        //cargo.setId((long) (cargos.size() + 1)); // Simulate ID generation
        //cargos.add(cargo);
        //List<Cargodb> results = cargodbRepository.findByCarrierCodeAndFlightNoAndFlightDate(
        //            cargo.getCarrierCode(), cargo.getFlightNo(), cargo.getFlightDate());


        List<Document> results =  service.findAllCargo(cargo);
        return ResponseEntity.ok(results);

//        return productRepository.findById(id)
//                .map(existingProduct -> {
//                    existingProduct.setName(updatedProduct.getName());
//                    existingProduct.setPrice(updatedProduct.getPrice());
//                    Product savedProduct = productRepository.save(existingProduct);
//                    return ResponseEntity.ok(savedProduct);
//                })
//                .orElse(ResponseEntity.notFound().build());
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(cargo);
    }




}