package com.my.restaurant.service.reservationService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.reservationDto.ReservationDto;
import com.my.restaurant.domain.entity.reservation.Reservation;

import java.util.List;

public interface ReservationService {
    ReservationDto getReservation(Long reservationId);
    ReservationDto addReservation(ReservationDto reservationDto);
    void delReservation(Long reservationId);
    PageResponseDto<ReservationDto> getReservations(PageRequestDto request);
//    PageResponseDto<ReservationDto> getReservationsByUserName(String userName, PageRequestDto request);
}
