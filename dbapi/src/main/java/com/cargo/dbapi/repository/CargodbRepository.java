package com.cargo.dbapi.repository;

import com.cargo.dbapi.model.Cargodb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargodbRepository extends MongoRepository<Cargodb, String> {
    //Cargodb findByCarrierCode(String carrierCode);
    List<Cargodb> findByCarrierCode(String carrierCode);
}