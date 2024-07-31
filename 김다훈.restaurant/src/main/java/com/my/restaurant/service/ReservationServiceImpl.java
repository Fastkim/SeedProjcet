package com.my.restaurant.service;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.ReservationDto;
import com.my.restaurant.domain.entity.Reservation;
import com.my.restaurant.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private final ModelMapper modelMapper;
    private final ReservationRepository reservationRepository;

    @Override
    public ReservationDto getReservation(Long reservationId) {
        Optional<Reservation> result = reservationRepository.findById(reservationId);
        Reservation reservation = result.orElseThrow(() -> new RuntimeException("Reservation not found"));
        return modelMapper.map(reservation, ReservationDto.class);
    }

    @Override
    public ReservationDto addReservation(ReservationDto reservationDto) {
        Reservation reservation = modelMapper.map(reservationDto, Reservation.class);
        Reservation result = reservationRepository.save(reservation);
        ReservationDto dtoResult = modelMapper.map(result, ReservationDto.class);
        return dtoResult;  // 생성된 예약 ID 설정
    }

    // User나 admin에서 예약을 삭제(User입장에서는 취소)하면 User에게 알림이 가게 한다??
    @Override
    public void delReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    // 페이징 처리 ==> 유저에게는 보이지 않고 관리자 화면에서 보이게 함.
    @Override
    public PageResponseDto<ReservationDto> getReservations(PageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize(), Sort.by("reservationId").descending());
        Page<Reservation> page = reservationRepository.findAll(pageable);
        List<ReservationDto> reservations = page.getContent().stream()
                .map(reservation -> modelMapper.map(reservation, ReservationDto.class))
                .collect(Collectors.toList());

        long totalReservations = page.getTotalElements();
        return PageResponseDto.<ReservationDto>builder()
                .items(reservations)
                .request(request)
                .totItemCnt(totalReservations)
                .build();
    }
}
