package com.my.restaurant.service.adverisementService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.advertisementDto.AdvertisementDto;

import java.time.LocalDate;
import java.util.List;

public interface AdvertisementService {
    AdvertisementDto findByAdvertisementNo(Long advertisementNo);
    void addAdvertisement(AdvertisementDto advertisementDto);                                       // 광고추가 메서드
    List<AdvertisementDto> getAllAdvertisements();                                                  // 광고목록조회 메서드
    PageResponseDto<AdvertisementDto> getAllAdvertisements(PageRequestDto request);                 // 페이지네이션
    List<AdvertisementDto> searchAdvertisements(String type, String query);                         // 광고검색 메서드
    List<AdvertisementDto> searchAdvertisementsByDateRange(LocalDate startDate, LocalDate endDate); // 날짜 범위로 검색
    boolean deleteAdvertisement(Long advertisementNo);                                              // 광고 삭제 메서드 추가
    boolean updateAdvertisement(Long advertisementNo, AdvertisementDto advertisementDto);           // 광고 수정(업데이트) 메서드 추가
}