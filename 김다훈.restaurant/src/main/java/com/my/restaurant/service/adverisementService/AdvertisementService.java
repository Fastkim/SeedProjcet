package com.my.restaurant.service.adverisementService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.advertisementDto.AdvertisementDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdvertisementService {
    AdvertisementDto findByAdvertisementNo(Long advertisementNo);
    void addAdvertisement(AdvertisementDto advertisementDto); // 광고추가 메서드
    PageResponseDto<AdvertisementDto> getAllAdvertisements(PageRequestDto request);// 광고목록조회 메서드
    List<AdvertisementDto> searchAdvertisements(String type, String query); // 광고검색 메서드
    boolean deleteAdvertisement(Long advertisementNo);        // 광고 삭제 메서드 추가
    boolean updateAdvertisement(Long advertisementNo, AdvertisementDto advertisementDto);   // 광고 수정(업데이트) 메서드 추가
}