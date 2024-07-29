package com.my.restaurant.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder // AdvertisementDto 객체를 정의하고 그 객체를 생성할때 생성자 대신 사용
@AllArgsConstructor
@NoArgsConstructor
public class AdvertisementDto {
    private Long advertisementNo;
    private String restaurantName;
    private String advertisementTitle;
    private String advertisementContent;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate createDate;
    private byte[] advertisementImage;
}
