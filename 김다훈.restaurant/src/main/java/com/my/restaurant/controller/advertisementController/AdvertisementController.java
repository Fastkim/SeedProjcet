package com.my.restaurant.controller.advertisementController;                   // 이 클래스의 패키지를 지정

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.advertisementDto.AdvertisementDto;   // DTO 클래스 사용을 위해 import

import com.my.restaurant.service.adverisementService.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor // 의존성주입해줌
@RequestMapping("advertisement")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addAdvertisement(@RequestBody AdvertisementDto advertisementDto) {
        advertisementService.addAdvertisement(advertisementDto);
        return ResponseEntity.ok(Map.of("result", "광고 추가"));
    }

    // 'AdminAdList 페이지에서 등록한 광고를 리스트에 표시하려면 백엔드에서 목록을 조회하고 이를 프론트엔드에서 표시하도록 설정
    // 광고 목록을 가져오는 API를 백엔드에 추가. 이 API는 DB에서 광고 목록을 조회하고, 이를 JSON 형식으로 반환한다.
    // 광고 목록 조회 API 백엔드에 추가
//    @GetMapping("/list")
//    // 광고 목록 조회 요청 처리
//    public ResponseEntity<List<AdvertisementDto>> getAdvertisements() {
//        List<AdvertisementDto> advertisements = advertisementService.getAllAdvertisements();
//        return ResponseEntity.ok(advertisements);
//    }
    // 페이지네이션 처리 메서드 (ing)
    @GetMapping("/list")
    public PageResponseDto<AdvertisementDto> getAdvertisements(PageRequestDto request) {
        return advertisementService.getAllAdvertisements(request);
    }

    // 광고 검색 API 백엔드에 추가
    @GetMapping("/search")
    // 광고 검색 요청 처리
    public ResponseEntity<List<AdvertisementDto>> searchAdvertisements(@RequestParam String type, @RequestParam String query) {
        List<AdvertisementDto> advertisements = advertisementService.searchAdvertisements(type, query);
        return ResponseEntity.ok(advertisements);
    }
    // 검색 '작성일' 시작날짜~끝날짜 메서드
    @GetMapping("/searchByDateRange")
    public ResponseEntity<List<AdvertisementDto>> searchAdvertisementsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<AdvertisementDto> advertisements = advertisementService.searchAdvertisementsByDateRange(startDate, endDate);
        return ResponseEntity.ok(advertisements);
    }

    // 광고 검색 API 백엔드에 추가
    @GetMapping("/details/{advertisementNo}")
    // 특정 광고 세부 정보 조회 요청 처리
    public ResponseEntity<AdvertisementDto> getAdvertisement(@PathVariable Long advertisementNo) {
        AdvertisementDto advertisementDto = advertisementService.findByAdvertisementNo(advertisementNo);
        if (advertisementDto != null) {
            return ResponseEntity.ok(advertisementDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 광고 삭제 API 백엔드에 추가
    @DeleteMapping("/delete/{advertisementNo}")
    // 특정 광고 삭제 요청 처리
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long advertisementNo) {
        boolean deleted = advertisementService.deleteAdvertisement(advertisementNo);        // 'advertisementService' 에서 'deleteAdvertisement' 메서드가 삭제 기능을 수행한다. ('AdvertisementRepository'를 사용하여 광고를 삭제하도록 구현)
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 광고 수정 API 백엔드에 추가
    @PutMapping("/update/{advertisementNo}")
    // 특정 광고 수정 요청 처리
    public ResponseEntity<Void> updateAdvertisement(@PathVariable Long advertisementNo, @RequestBody AdvertisementDto advertisementDto) {
        boolean updated = advertisementService.updateAdvertisement(advertisementNo, advertisementDto);
        if (updated) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}