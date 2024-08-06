package com.my.restaurant.service.reservationService;


import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.reservationDto.ReservationDto;
import com.my.restaurant.domain.dto.userDto.UserDto;
import com.my.restaurant.domain.entity.reservation.Reservation;
import com.my.restaurant.domain.entity.restaurant.Restaurant;
import com.my.restaurant.domain.entity.user.User;
import com.my.restaurant.repository.reservationRepository.ReservationRepository;
import com.my.restaurant.repository.restaurantRepository.RestaurantRepository;
import com.my.restaurant.repository.userRepository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

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
        return dtoResult;
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

//     내 예약보기(유저 한명에게 종속되어있는 n개의 예약 조회)
//    public PageResponseDto<ReservationDto> getReservationsByUserName(String userName, PageRequestDto request) {
//        // Pageable 생성
//        Pageable pageable = PageRequest.of(
//                request.getPage() - 1, // PageRequest는 0부터 시작하므로 -1
//                request.getSize(),
//                Sort.by("reservationId").descending() // 정렬 필드와 방향 설정
//        );
//
//        // Start and End Row Calculation
//        int startRow = (request.getPage() - 1) * request.getSize() + 1;
//        int endRow = startRow + request.getSize() - 1;
//
//        List<ReservationDto> reservations;
//        long totReservationCnt;
//
//        try {
//            // 예약 데이터 페이징 조회
//            List<Reservation> reservationList = reservationRepository.findReservationsByUserNameWithPagination(userName, startRow, endRow);
//            System.out.println("Reservation List: " + reservationList);
//
//
//            // Reservation 엔티티를 ReservationDto로 변환
//            reservations = reservationList.stream()
//                    .map(reservation -> {
//                        ReservationDto reservationDto = modelMapper.map(reservation, ReservationDto.class);
//                        return reservationDto;
//                    })
//                    .collect(Collectors.toList());
//
//            // 총 예약 수 조회
//            totReservationCnt = reservationRepository.countReservationsByUserName(userName);
//
//        } catch (Exception e) {
//            // 예외 처리: 로깅, 사용자에게 적절한 오류 메시지 전달 등
//            e.printStackTrace(); // 콘솔에 예외 스택 트레이스를 출력합니다.
//            throw new RuntimeException("예약 데이터를 조회하는 중 오류가 발생했습니다.", e);
//        }
//
//        // PageResponseDto 객체 생성
//        PageResponseDto<ReservationDto> response = PageResponseDto.<ReservationDto>builder()
//                .items(reservations)
//                .request(request)
//                .totItemCnt(totReservationCnt)
//                .build();
//
//        return response;
//    }
}
