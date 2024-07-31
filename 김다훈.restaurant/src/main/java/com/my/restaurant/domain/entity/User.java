package com.my.restaurant.domain.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="users")
@Data
@ToString
@Builder //builder에 AllargsConstructor가 파라미터를 넘겨준다.
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id //기본키(PK-key 설정)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="userSequence")
	@SequenceGenerator(name="userSequence", sequenceName="user_seq", allocationSize=1)
	private Long userNo;
	private String userId;
	private String userPw;
	private String userName;
	private String phoneNumber;
	private LocalDate joinDate;
	private String email;
}
