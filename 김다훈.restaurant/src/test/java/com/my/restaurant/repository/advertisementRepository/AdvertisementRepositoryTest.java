package com.my.restaurant.repository.advertisementRepository;

import com.my.restaurant.domain.entity.advertisement.Advertisement;
import com.my.restaurant.domain.entity.user.User;
import com.my.restaurant.repository.userRepository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;


@SpringBootTest
public class AdvertisementRepositoryTest {
    @Autowired private AdvertisementRepository advertisementRepository;

    @Test
    public void insertAdvertiesement() { //테스트하고싶은 메서드이름에만 커서찍고 F4누르면 테스트실행(JUnit), 녹색줄나오면 pass, 빨간줄은 에러
        for(int i = 1; i <= 100; i++) {
            Advertisement advertisement = Advertisement.builder() // builder 패턴 chaining
                    .advertisementContent("content" + i)
                    .advertisementTitle("title" + i)
                    .build();
            advertisementRepository.save(advertisement);
        }
    }


}
