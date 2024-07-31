package com.my.restaurant.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="reservations")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY, generator="reservationSequence")
    @SequenceGenerator(name="reservationSequence", sequenceName="reservation_seq", allocationSize=1)
    private Long reservationId;
    private String userId;
    private LocalDate reservationDate;
    private String restaurantName;
    private Long price;
    private LocalTime reservationTime;
    private Long peopleNum;
}
