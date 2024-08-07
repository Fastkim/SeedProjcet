package com.my.restaurant.domain.dto.restaurantDto;

import com.my.restaurant.domain.entity.reservation.Reservation;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder // UserSignUpDto 객체를 정의하고 그 객체를 생성할때 생성자 대신 사용
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDto {
    private Long restaurantId;
    private String restaurantName;
    private String restaurantCategory;
    private String businessHours;
    private String price;
    private String description;
    private String restaurantImg;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval = true => 수정과정에서 Null로 변한 객체를 DELETE하도록 한다 자동으로
    private List<Reservation> reservations;
}