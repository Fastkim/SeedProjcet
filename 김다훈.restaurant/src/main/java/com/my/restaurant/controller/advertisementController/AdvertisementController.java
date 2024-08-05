package com.my.restaurant.controller.advertisementController;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.advertisementDto.AdvertisementDto;
import com.my.restaurant.service.adverisementService.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/list")
    public PageResponseDto<AdvertisementDto> getAdvertisements(PageRequestDto request) {
        return advertisementService.getAllAdvertisements(request);
//        List<AdvertisementDto> advertisements = advertisementService.getAllAdvertisements();
//        return ResponseEntity.ok(advertisements);
    }

    // 광고 검색 API 백엔드에 추가
    @GetMapping("/search")
    public ResponseEntity<List<AdvertisementDto>> searchAdvertisements(@RequestParam String type, @RequestParam String query) {
        List<AdvertisementDto> advertisements = advertisementService.searchAdvertisements(type, query);
        return ResponseEntity.ok(advertisements);
    }

    // 광고 UPDATE 백엔드 추가
    @GetMapping("/details/{advertisementNo}")
    public ResponseEntity<AdvertisementDto> getAdvertisement(@PathVariable Long advertisementNo) {
        AdvertisementDto advertisementDto = advertisementService.findByAdvertisementNo(advertisementNo);
        if (advertisementDto != null) {
            return ResponseEntity.ok(advertisementDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 광고 삭제 백엔드 추가
    @DeleteMapping("/delete/{advertisementNo}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long advertisementNo) {
        boolean deleted = advertisementService.deleteAdvertisement(advertisementNo);        // 'advertisementService' 에서 'deleteAdvertisement' 메서드가 삭제 기능을 수행한다. ('AdvertisementRepository'를 사용하여 광고를 삭제하도록 구현)
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 광고 수정 (광고 업데이트 요청을 처리하는 엔드포인트를 추가)
    @PutMapping("/update/{advertisementNo}")
    public ResponseEntity<Void> updateAdvertisement(@PathVariable Long advertisementNo, @RequestBody AdvertisementDto advertisementDto) {
        boolean updated = advertisementService.updateAdvertisement(advertisementNo, advertisementDto);
        if (updated) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}