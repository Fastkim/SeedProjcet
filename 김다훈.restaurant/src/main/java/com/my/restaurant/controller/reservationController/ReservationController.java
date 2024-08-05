package com.my.restaurant.controller.reservationController;


import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.reservationDto.ReservationDto;
import com.my.restaurant.service.reservationService.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("{reservationId}")
    public ReservationDto getReservation(@PathVariable(name="reservationId") Long reservationId) {
        System.out.println(reservationId);
        return reservationService.getReservation(reservationId);
    }

    @GetMapping("list")
    public PageResponseDto<ReservationDto> getReservations(PageRequestDto request) {
        return reservationService.getReservations(request);
    }

    @PostMapping("add")
    public ReservationDto addReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto reservationId = reservationService.addReservation(reservationDto);
        return reservationId;
    }

    @DeleteMapping("del/{reservationId}")
    public Map<String, String> delReservation(@PathVariable(name="reservationId") Long reservationId) {
        reservationService.delReservation(reservationId);
        return Map.of("result", "예약 삭제");
    }
}
