package com.my.restaurant.domain.entity.reservation;

import com.my.restaurant.domain.entity.restaurant.Restaurant;
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

    @OneToOne
    @JoinColumn(name = "restaurant_id") // FK 매핑
    private Restaurant restaurant;
    private Long price;
    private LocalTime reservationTime;
    private Long peopleNum;
}
