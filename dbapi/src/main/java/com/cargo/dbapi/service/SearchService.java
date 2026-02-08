package com.cargo.dbapi.service;

import com.cargo.dbapi.model.Cargodb;
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
    @Autowired
    MongoClient mongoClient;

    public List<Document> findAllCargo(Payload payload) {
        String carrierCode = payload.getCarrierCode();
        String flightNo = payload.getFlightNo();
        LocalDate flightDate = payload.getFlightDate();
        String origin = payload.getOrigin();
        String flightStatus = payload.getFlightStatus();
        //TODO: validate input parameters and build query accordingly

        Document filter = new Document();

        if (carrierCode != null && !carrierCode.isEmpty()) {
            if (!carrierCode.matches("^[A-Za-z]{2}$")) {
                throw new IllegalArgumentException("Invalid carrierCode.");
            }
            filter.append("carrierCode", carrierCode.toUpperCase());
        }

        if (flightNo != null && !flightNo.isEmpty()) {
            if (!flightNo.matches("^\\d{1,5}$")) {
                throw new IllegalArgumentException("Invalid flightNo");
            }
            filter.append("flightNo", flightNo);
        }

        if (flightDate != null) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                formatter.parse(flightDate.toString());
                String formattedDate = flightDate.format(formatter);
                filter.append("flightDate", formattedDate);
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid flightDate.");
            }
        }

        if (origin != null && !origin.isEmpty()) {
            if (!origin.matches("^[A-Za-z]{3}$")) {
                throw new IllegalArgumentException("Invalid origin.");
            }
            filter.append("origin", origin.toUpperCase());
        }

        if (flightStatus != null && !flightStatus.isEmpty()) {
            List<String> validStatuses = List.of("Not_yet_departed", "Departed", "Arrived", "Cancelled");
            if (!validStatuses.contains(flightStatus)) {
                throw new IllegalArgumentException("Invalid flightStatus.");
            }
            filter.append("flightStatus", flightStatus);
        }


        List<Document> jsonResults = new ArrayList<Document>();

        MongoDatabase db = mongoClient.getDatabase("myappdb");
        MongoCollection<Document> collection = db.getCollection("cargodb");


        for (Document doc : collection.find(filter)) {

            jsonResults.add(doc);
        }

        return jsonResults;
    }
}
