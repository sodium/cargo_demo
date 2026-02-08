package com.cargo.dbapi.service;
import com.cargo.dbapi.model.Payload;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;

@SpringBootTest
class SearchServiceTest {

    private SearchService searchService;

    @Mock
    private MongoClient mongoClient;

    @Mock
    private MongoDatabase mongoDatabase;

    @Mock
    private MongoCollection mongoCollection;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        searchService = new SearchService();
        searchService.mongoClient = mongoClient;

        when(mongoClient.getDatabase("myappdb")).thenReturn(mongoDatabase);
        when(mongoDatabase.getCollection("cargodb")).thenReturn(mongoCollection);
    }

    @Test
    void testFindAllCargo() {
        // Arrange
        Payload payload = new Payload();
        payload.setCarrierCode("AA");
        payload.setFlightNo("123");
        payload.setFlightDate(LocalDate.of(2023, 10, 1));
        payload.setOrigin("JFK");
        payload.setFlightStatus("Departed");

        Document mockDocument = new Document("carrierCode", "CX")
                .append("flightNo", "171")
                .append("flightDate", "2025-12-15")
                .append("origin", "HKG")
                .append("flightStatus", "Not_yet_departed");

        FindIterable<Document> mockIterable = mock(FindIterable.class);

        when(mongoCollection.find(any(Document.class))).thenReturn(mockIterable);
        MongoCursor cursor = mock(MongoCursor.class);

        when(mockIterable.iterator()).thenReturn(cursor);
        when(cursor.hasNext())
                .thenReturn(true)
                .thenReturn(false);
        when(cursor.next())
                .thenReturn(mockDocument);



        // Act
        List<Document> result = searchService.findAllCargo(payload);

        // Assert
        assertEquals(1, result.size());
        assertEquals("CX", result.get(0).getString("carrierCode"));
        assertEquals("171", result.get(0).getString("flightNo"));
        assertEquals("2025-12-15", result.get(0).getString("flightDate"));
        assertEquals("HKG", result.get(0).getString("origin"));
        assertEquals("Not_yet_departed", result.get(0).getString("flightStatus"));

        verify(mongoClient).getDatabase("myappdb");
        verify(mongoDatabase).getCollection("cargodb");
        verify(mongoCollection).find(any(Document.class));
    }
}