package com.my.restaurant.service.reservationService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.reservationDto.ReservationDto;

public interface ReservationService {
    ReservationDto getReservation(Long reservationId);
    ReservationDto addReservation(ReservationDto reservationDto);
    void delReservation(Long reservationId);
    PageResponseDto<ReservationDto> getReservations(PageRequestDto request);
}
