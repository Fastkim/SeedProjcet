package com.my.restaurant.domain.entity.advertisement;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data                           // getterm, setter 합쳐놓은 것
@Entity
@Table(name="advertisements")
@Getter
@ToString
@Builder                        //builder에 AllargsConstructor가 파라미터를 넘겨준다.
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
    @Column(name = "advertisement_image", length = 255)
    private String advertisementImage;
    private LocalDate createDate;
}