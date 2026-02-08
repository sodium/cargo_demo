package com.cargo.configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb://appuser:apppassword@cargodb:27017/myappdb?authSource=myappdb");
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        // Specify the database name here
        return new MongoTemplate(mongoClient, "myappdb");
    }
}
