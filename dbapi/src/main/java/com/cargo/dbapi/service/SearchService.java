package com.cargo.dbapi.service;

import com.cargo.dbapi.model.Cargodb;
import com.cargo.dbapi.repository.CargodbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoClient;
import org.bson.Document;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
import org.bson.conversions.Bson;
import com.cargo.dbapi.model.Payload;


@Service
public class SearchService {

    private final CargodbRepository repository;

    @Autowired
    MongoClient mongoClient;

    @Autowired
    public SearchService(CargodbRepository repository) {
        this.repository = repository;
    }

    public List<Document> findAllCargo(Payload payload) {
        String carrierCode = payload.getCarrierCode();
        String flightNo = payload.getFlightNo();
        LocalDate flightDate = payload.getFlightDate();
        String origin = payload.getOrigin();
        String flightStatus = payload.getFlightStatus();
        //TODO: validate input parameters and build query accordingly


        Document filter = new Document();
        if(carrierCode != null){
            filter.append("carrierCode", carrierCode);
        }
        if (flightNo != null) {
            filter.append("flightNo", flightNo);
        }
        if (flightDate != null) {
            // TODO: format date time
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedDate = flightDate.format(formatter);
            filter.append("flightDate", formattedDate);
        }
        if (origin != null) {
            filter.append("origin", origin);
        }
        if (flightStatus != null) {
            filter.append("flightStatus", flightStatus);
        }


        List<Document> jsonResults = new ArrayList<Document>();

        MongoDatabase db = mongoClient.getDatabase("myappdb");
        MongoCollection<Document> collection = db.getCollection("cargodb");


        for (Document doc : collection.find(filter)) {
            // Convert each Document to a JSON string
            //String jsonString = doc.toJson();
            jsonResults.add(doc);
        }
        //Document myDoc = collection.find().first();
        //System.out.println(jsonResults);

        //List<Cargodb> result = repository.findAll();

        //System.out.print("result: "+result);
        return jsonResults;
    }
}
