package com.my.restaurant.service;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.ReservationDto;
import com.my.restaurant.domain.entity.Reservation;

public interface ReservationService {
    ReservationDto getReservation(Long reservationId);
    ReservationDto addReservation(ReservationDto reservationDto);
    void delReservation(Long reservationId);
    PageResponseDto<ReservationDto> getReservations(PageRequestDto request);
}
