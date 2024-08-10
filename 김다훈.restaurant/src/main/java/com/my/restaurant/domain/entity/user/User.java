package com.my.restaurant.domain.entity.user;

import com.my.restaurant.domain.entity.inquiry.Inquiry;
import com.my.restaurant.domain.entity.reservation.Reservation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="users")
@Data
@ToString
@Builder //builder에 AllargsConstructor가 파라미터를 넘겨준다.
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id //기본키(PK-key 설정)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator = "userSequence")
	@SequenceGenerator(name="userSequence", sequenceName = "user_seq", initialValue = 1, allocationSize = 1)
	private Long userId;
	private String userName;
	private String userPw;
	private String personalName;
	private String phoneNumber;
	private LocalDate birthDay;
	private String userEmail;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Reservation> reservations;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Inquiry> inquiries;
}