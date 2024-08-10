package com.my.restaurant.service.userService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.userDto.*;
import com.my.restaurant.domain.entity.user.User;
import com.my.restaurant.repository.userRepository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor //Autowired를 사용하지않고 의존성주입을 할때 사용
public class UserServiceImpl implements UserService {
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;

	@Override
	public UserLoginDto findBy(UserLoginDto params) {
		User user = userRepository.findByUserNameAndUserPw(params.getUserName(), params.getUserPw());
		System.out.println(user);
		UserLoginDto userLoginDto = modelMapper.map(user, UserLoginDto.class);
		return userLoginDto;
	}

	@Override
	public void passwordFix(UserPwFixDto userPwFixDto) {
		userRepository.patchPw(userPwFixDto.getUserPw(), userPwFixDto.getUserName());
	}


	@Override
	public String findBy_UserName(String personalName, String userEmail) {
		String result = "";

		result = userRepository.find_id(personalName, userEmail);
		System.out.println(result);
		if(result == null) {
			result="error";
		}

		return result;
	}

	@Override
	public String findBy_pw(String personalName, String userEmail, String phoneNumber) {
		String result = "";
		try {
			result = userRepository.find_pw(personalName, userEmail, phoneNumber);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public void addUser(UserSignUpDto userSignUpDto) {
		User user = modelMapper.map(userSignUpDto, User.class);
		userRepository.save(user);
	}

	@Override
	public UserDto getUser(Long userId) {
		Optional<User> result = userRepository.findById(userId);
		User user = result.orElseThrow();
		UserDto userDto = modelMapper.map(user, UserDto.class);
		return userDto;
	}

	@Override
	public PageResponseDto<UserDto> getUsers(PageRequestDto request) {
		// Pageable 생성
		Pageable pageable = PageRequest.of(
				request.getPage() - 1, // PageRequest는 0부터 시작하므로 -1
				request.getSize(),
				Sort.by("userId").descending() // 정렬 필드와 방향 설정
		);

		// Start and End Row Calculation
		int startRow = (request.getPage() - 1) * request.getSize() + 1;
		int endRow = startRow + request.getSize() - 1;

		List<UserDto> users;
		long totUserCnt;

		try {
			// 사용자 데이터 페이징 조회
			List<User> userList = userRepository.findUsersWithPagination(startRow, endRow);

			// User 엔티티를 UserDto로 변환
			users = userList.stream()
					.map(user -> modelMapper.map(user, UserDto.class))
					.collect(Collectors.toList());

			// 총 사용자 수 조회
			totUserCnt = userRepository.countUsers();

		} catch (Exception e) {
			// 예외 처리: 로깅, 사용자에게 적절한 오류 메시지 전달 등
			e.printStackTrace(); // 콘솔에 예외 스택 트레이스를 출력합니다.
			throw new RuntimeException("사용자 데이터를 조회하는 중 오류가 발생했습니다.", e);
		}

		// PageResponseDto 객체 생성
		PageResponseDto<UserDto> response = PageResponseDto.<UserDto>builder()
				.items(users)
				.request(request)
				.totItemCnt(totUserCnt)
				.build();

		return response;
	}

	@Override
	public void userUpdate(UserUpdateDto userUpdateDto) {
		userRepository.patchUser(userUpdateDto.getUserName(), userUpdateDto.getPersonalName(), userUpdateDto.getBirthDay(),
				userUpdateDto.getPhoneNumber(), userUpdateDto.getUserPw(), userUpdateDto.getUserEmail(), userUpdateDto.getUserId());
	}

	@Override
	public void delUser(Long userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public void certifiedPhoneNumber(String u_phone, String cerNum) {
		Api api = new Api();
		String api_key = api.api_key;
		String api_secret = api.api_secret;
		DefaultMessageService messageService =  NurigoApp.INSTANCE.initialize(api_key, api_secret, "http://api.coolsms.co.kr");
		Message message = new Message();
		message.setFrom("01087817327"); // 발신번호
		message.setTo(u_phone); // 수신번호
		message.setText("휴대폰인증 메시지 : 인증번호는" + "[" + cerNum + "]" + "입니다."); // 4자리 인증번호: 1~9난수 4자리

		try {
			messageService.send(message);
		} catch (NurigoMessageNotReceivedException exception) {
			// 발송에 실패한 메시지 목록을 확인할 수 있다.
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}
	}

	public Boolean isUserNameAvailable(String userName) {
		Optional result = userRepository.duplicatedUserName(userName);

		if(result.isEmpty()) {
			return true;
		} else {
			return false;
		}
	}

	// 유저 검색
	@Override
	public List<UserDto> searchUser(String type, String query) {
		List<User> users;
		if (type.equals("식별번호")) {
			Long userId = Long.parseLong(query);
			User user = userRepository.findByUserId(userId);
			users = user != null ? List.of(user) : List.of();
		} else if (type.equals("이름")) {
			users = userRepository.findByPersonalNameContaining(query);
		} else if (type.equals("ID")) {
			users = userRepository.findByUserNameContaining(query);
		} else {
			// 날짜 형식이 잘못된 경우 빈 리스트 반환
			users = List.of();
		}
		return users.stream()
				.map(user -> modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
	}

}
