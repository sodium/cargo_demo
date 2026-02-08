package com.cargo.dbapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.OffsetDateTime;


@Document(collection = "cargodb")
public class Cargodb {

    private String carrierCode;
    private String flightNo;
    private String origin;
    private String destination;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate flightDate;

    private String aircraftType;
    private String aircraftCatg;
    private String flightStatus;
    private String departureTime;
    private String arrivalTime;
    private boolean flightCancelled;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime STD;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime ETD;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime ATD;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime STA;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime ETA;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
    private OffsetDateTime ATA;

    // Getters and Setters
    public String getCarrierCode() {
        return carrierCode;
    }

    public void setCarrierCode(String carrierCode) {
        this.carrierCode = carrierCode;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(LocalDate flightDate) {
        this.flightDate = flightDate;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public String getAircraftCatg() {
        return aircraftCatg;
    }

    public void setAircraftCatg(String aircraftCatg) {
        this.aircraftCatg = aircraftCatg;
    }

    public String getFlightStatus() {
        return flightStatus;
    }

    public void setFlightStatus(String flightStatus) {
        this.flightStatus = flightStatus;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public boolean isFlightCancelled() {
        return flightCancelled;
    }

    public void setFlightCancelled(boolean flightCancelled) {
        this.flightCancelled = flightCancelled;
    }

    public OffsetDateTime getSTD() {
        return STD;
    }

    public void setSTD(OffsetDateTime STD) {
        this.STD = STD;
    }

    public OffsetDateTime getETD() {
        return ETD;
    }

    public void setETD(OffsetDateTime ETD) {
        this.ETD = ETD;
    }

    public OffsetDateTime getATD() {
        return ATD;
    }

    public void setATD(OffsetDateTime ATD) {
        this.ATD = ATD;
    }

    public OffsetDateTime getSTA() {
        return STA;
    }

    public void setSTA(OffsetDateTime STA) {
        this.STA = STA;
    }

    public OffsetDateTime getETA() {
        return ETA;
    }

    public void setETA(OffsetDateTime ETA) {
        this.ETA = ETA;
    }

    public OffsetDateTime getATA() {
        return ATA;
    }

    public void setATA(OffsetDateTime ATA) {
        this.ATA = ATA;
    }
}