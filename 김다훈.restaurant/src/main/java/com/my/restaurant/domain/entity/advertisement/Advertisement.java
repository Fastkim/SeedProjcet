package com.my.restaurant.domain.entity.advertisement;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name="advertisements")
@Getter
@ToString
@Builder //builder에 AllargsConstructor가 파라미터를 넘겨준다.
@AllArgsConstructor
@NoArgsConstructor
public class Advertisement {
    @Id //기본키(PK-key 설정)
    @GeneratedValue(strategy= GenerationType.IDENTITY, generator = "advertisementSequence")
    @SequenceGenerator(name = "advertisementSequence", sequenceName = "advertisement_seq", allocationSize = 1)
    private Long advertisementNo;
    private String restaurantName;
    private String advertisementTitle;
    private String advertisementContent;
    private String advertisementImage;
    private LocalDate createDate;
//    @Lob // 이미지를 저장할 필드에 @Lob 애너테이션 추가
//    private byte[] advertisementImage; // 이미지 필드 추가

}