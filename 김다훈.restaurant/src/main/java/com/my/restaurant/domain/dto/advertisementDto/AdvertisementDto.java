package com.my.restaurant.domain.dto.advertisementDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder                                    // AdvertisementDto 객체를 정의하고 그 객체를 생성할때 생성자 대신 사용
@AllArgsConstructor
@NoArgsConstructor
public class AdvertisementDto {
    private Long advertisementNo;
    private String restaurantName;
    private String advertisementTitle;
    private String advertisementContent;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")        // JSON형식으로 데이터를 직렬화할 때 날짜 형식(yyyy-MM-dd)을 지정한다.
    private LocalDate createDate;
    private String advertisementImage;                                      // 이미지 파일을 byte 배열로 저장한다.
}