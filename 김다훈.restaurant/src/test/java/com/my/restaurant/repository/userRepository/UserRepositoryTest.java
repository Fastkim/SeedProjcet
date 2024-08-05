package com.my.restaurant.repository.userRepository;

import com.my.restaurant.domain.entity.user.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;


@SpringBootTest
public class UserRepositoryTest {
    @Autowired private UserRepository userRepository;

    @Test
    public void insertUser() { //테스트하고싶은 메서드이름에만 커서찍고 F4누르면 테스트실행(JUnit), 녹색줄나오면 pass, 빨간줄은 에러
        for(int i = 1; i <= 100; i++) {
            User user = User.builder() // builder 패턴 chaining
                    .personalName("김다훈" + i)
                    .userName("ID " + i)
                    .birthDay(LocalDate.now().plusDays(i))
                    .phoneNumber("0108781732" + i)
                    .userPw("1234" + i)
                    .userEmail("eamil " + i)
                    .build();
            userRepository.save(user);
        }
    }


}
