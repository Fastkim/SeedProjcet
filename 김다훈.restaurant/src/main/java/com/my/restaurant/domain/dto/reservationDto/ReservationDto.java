package com.my.restaurant.domain.dto.reservationDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.my.restaurant.domain.entity.restaurant.Restaurant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long reservationId;
    private String userName;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate reservationDate;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    private String restaurantName;
    private String price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime reservationTime;
    private Long peopleNum;

//    public ZonedDateTime getReservationTimeInKorea() {
//        ZoneId koreaZoneId = ZoneId.of("Asia/Seoul");
//        return ZonedDateTime.of(ZonedDateTime.now(koreaZoneId).toLocalDate(), reservationTime, koreaZoneId);
//    }
}

// 사용자 이름(foreign key)로 구분을 할 수 있지만(누가 예약했는지), 설계상에서는 사용자 이름이 나오지 않음.
// userName ==> Foreign key임을 알릴 수 있게 하는 어노테이션??(Entity??)
// Dto에서 제외해야 하느냐 그게 문제.
// 예약 추가를 할 때 사용자 이름은 어떻게 포함시켜야 하는가?