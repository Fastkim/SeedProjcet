package com.my.restaurant.domain.entity.restaurant;

import com.my.restaurant.domain.entity.reservation.Reservation;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Builder //builder에 AllargsConstructor가 파라미터를 넘겨준다.
@AllArgsConstructor
@NoArgsConstructor
@Table(name="restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "restaurantSequence")
    @SequenceGenerator(name = "restaurantSequence", sequenceName = "restaurant_seq", allocationSize = 1)
    private Long restaurantId;

    @Column(nullable = false)
    private String restaurantName;

    @Column(nullable = false)
    private String restaurantCategory;

    @Column(nullable = false)
    private String restaurantPriceRange;

    @Column(nullable = false)
    private boolean isReservationAvailable;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval = true => 수정과정에서 Null로 변한 객체를 DELETE하도록 한다 자동으로
    private List<Reservation> reservations;
}