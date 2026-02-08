package com.cargo.dbapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig {

    // Define a RestTemplate bean for making HTTP requests
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public @Bean com.mongodb.client.MongoClient mongoClient() {
        return com.mongodb.client.MongoClients.create("mongodb://appuser:apppassword@cargodb:27017/myappdb?authSource=myappdb");
    }

    // CORS configuration to whitelist specific domains
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow all endpoints
                        .allowedOrigins("http://localhost:8080/",
                                "http://webapp:5173/",
                                "http://localhost:5173/",
                                "http://localhost:3000/",
                                "http://localhost/") // Whitelisted domains
                        .allowedMethods("GET", "POST") // Allowed HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials (cookies, etc.)
            }
        };
    }

}