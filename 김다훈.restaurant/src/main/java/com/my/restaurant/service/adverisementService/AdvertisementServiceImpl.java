package com.my.restaurant.service.adverisementService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.advertisementDto.AdvertisementDto;
import com.my.restaurant.domain.entity.advertisement.Advertisement;
import com.my.restaurant.repository.advertisementRepository.AdvertisementRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

// AdvertisementServiceImpl 클래스는 광고를 생성할 때 데이터와 현재 날짜를 설정하고, DB에 저장한다.
// 또한, 광고 목록을 조회하고 검색할 때 DTO로 변환하여 반환한다.

@Service
@Transactional
@RequiredArgsConstructor    //Autowired를 사용하지않고 의존성주입을 할때 사용
public class AdvertisementServiceImpl implements AdvertisementService {
    private final ModelMapper modelMapper;
    private final AdvertisementRepository advertisementRepository;

    @Override
    public AdvertisementDto findByAdvertisementNo(Long advertisementNo) {
        Advertisement advertisement = advertisementRepository.findByAdvertisementNo(advertisementNo);
        return modelMapper.map(advertisement, AdvertisementDto.class);
    }
    // 광고 추가
    @Override
    public void addAdvertisement(AdvertisementDto advertisementDto) {
        Advertisement advertisement = modelMapper.map(advertisementDto, Advertisement.class);
        advertisement.setCreateDate(LocalDate.now());  // 현재 날짜 설정 (광고글 작성할 때 날짜를 직접 입력하지 않고, 실시간 작성 날짜로 자동 입력된다)
        advertisementRepository.save(advertisement);
    }
    // 광고목록 조회
    @Override
    public PageResponseDto<AdvertisementDto> getAllAdvertisements(PageRequestDto request) {
        // Pageable 생성
        Pageable pageable = PageRequest.of(
                request.getPage() - 1, // PageRequest는 0부터 시작하므로 -1
                request.getSize(),
                Sort.by("advertisementNo").descending() // 정렬 필드와 방향 설정
        );

        // Start and End Row Calculation
        int startRow = (request.getPage() - 1) * request.getSize() + 1;
        int endRow = startRow + request.getSize() - 1;

        List<AdvertisementDto> advertisements;
        long totAdvertisementCnt;

        try {
            // 사용자 데이터 페이징 조회
            List<Advertisement> advertisementList = advertisementRepository.findAdvertisementsWithPagination(startRow, endRow);

            // User 엔티티를 UserDto로 변환
            advertisements = advertisementList.stream()
                    .map(advertisement -> modelMapper.map(advertisement, AdvertisementDto.class))
                    .collect(Collectors.toList());

            // 총 사용자 수 조회
            totAdvertisementCnt = advertisementRepository.countAdvertisements();

        } catch (Exception e) {
            // 예외 처리: 로깅, 사용자에게 적절한 오류 메시지 전달 등
            e.printStackTrace(); // 콘솔에 예외 스택 트레이스를 출력합니다.
            throw new RuntimeException("사용자 데이터를 조회하는 중 오류가 발생했습니다.", e);
        }

//       PageResponseDto 객체 생성
        PageResponseDto<AdvertisementDto> response = PageResponseDto.<AdvertisementDto>builder()
                .items(advertisements)
                .request(request)
                .totItemCnt(totAdvertisementCnt)
                .build();

        return response;
    }

    // 광고 검색
    @Override
    public List<AdvertisementDto> searchAdvertisements(String type, String query) {
        List<Advertisement> advertisements;
        if (type.equals("식별번호")) {
            Long advertisementNo = Long.parseLong(query);
            Advertisement advertisement = advertisementRepository.findByAdvertisementNo(advertisementNo);
            advertisements = advertisement != null ? List.of(advertisement) : List.of();
        } else if (type.equals("식당명")) {
            advertisements = advertisementRepository.findByRestaurantNameContaining(query);
        } else if (type.equals("작성일")) {
            LocalDate date = LocalDate.parse(query);
            advertisements = advertisementRepository.findByCreateDate(date);
        } else {
            // 날짜 형식이 잘못된 경우 빈 리스트 반환
            advertisements = List.of();
        }
        return advertisements.stream()
                .map(advertisement -> modelMapper.map(advertisement, AdvertisementDto.class))
                .collect(Collectors.toList());
    }

    // 광고 삭제 메서드
    @Override
    public boolean deleteAdvertisement(Long advertisementNo) {
        Advertisement advertisement = advertisementRepository.findByAdvertisementNo(advertisementNo);
        if (advertisement != null) {
            advertisementRepository.delete(advertisement);
            return true;
        } else {
            return false;
        }
    }

    // 광고 수정(업데이트) 로직
    @Override
    @Transactional
    public boolean updateAdvertisement(Long advertisementNo, AdvertisementDto advertisementDto) {
        Advertisement advertisement = advertisementRepository.findByAdvertisementNo(advertisementNo);
        if (advertisement != null) {
            advertisement.setRestaurantName(advertisementDto.getRestaurantName());
            advertisement.setAdvertisementContent(advertisementDto.getAdvertisementContent());
            advertisementRepository.save(advertisement);
            return true;
        } else {
            return false;
        }
    }
}