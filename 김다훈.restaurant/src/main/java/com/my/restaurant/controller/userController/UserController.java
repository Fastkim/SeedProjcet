package com.my.restaurant.controller.userController;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.userDto.*;
import com.my.restaurant.repository.userRepository.UserRepository;
import com.my.restaurant.service.userService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Random;

//restful app이라는것은 controller의 문제이다(다른점), 즉 front가 TV이건 스마트폰이건 json으로 데이터주고받는것은 동일
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor // 의존성주입해줌
@RequestMapping("user")
public class UserController {
	private final UserService userService;
	private final UserRepository userRepository;

	@PostMapping("/login")
	public UserLoginDto login(@RequestBody final UserLoginDto params) {
		UserLoginDto userLoginDto = userService.findBy(params);
		System.out.println(userLoginDto);
		return userLoginDto;
	}

	@PostMapping("/findUserName")
	public String userFindId(@RequestBody final UserFindIdDto params) {
        return userService.findBy_UserName(params.getPersonalName(), params.getUserEmail());
	}

	@PostMapping("/findUserPw")
	public String userFindPw(@RequestBody final UserFindPwDto params) {
        return userService.findBy_pw(params.getUserName(), params.getUserEmail(), params.getPhoneNumber());
	}

	@PatchMapping("/passwordFix")
	public void passwordFix(@RequestBody UserPwFixDto userPwFixDto) {
		userService.passwordFix(userPwFixDto);
	}

	@PostMapping("/add")
	public Map<String, String> addUser(@RequestBody UserSignUpDto userSignUpDto) { //@RequestBody: 데이터를 담는 본문
		userService.addUser(userSignUpDto);
		return Map.of("result", "USER 추가");
	}

	@GetMapping("{userId}")
	public UserDto getUser(@PathVariable("userId") Long userId) {
		return userService.getUser(userId);
	}

	@PatchMapping("/userUpdate")
	public void userUpdate(@RequestBody UserUpdateDto userUpdateDto) {
		userService.userUpdate(userUpdateDto);
	}

	@DeleteMapping("del/{userId}")
	public void delUser(@PathVariable(name="userId") Long userId) {
		userService.delUser(userId);
	}

	@PostMapping("/sendSMS")
	public String sendSMS (@RequestParam String u_phone) { // u_phone은 수신번호
		Random rnd = new Random(); // 인증번호 랜덤생성
		StringBuffer buffer = new StringBuffer(); // StringBuffer: string을 담을 string객체
		for (int i=0; i<4; i++) {
			buffer.append(rnd.nextInt(10)); // 0~9사이의 값을 4번 뽑아서 buffer객체에 담는다.
		}
		String cerNum = buffer.toString(); // buffer안에 들어있는 인증번호
		System.out.println("수신자 번호 : " + u_phone);
		System.out.println("인증번호 : " + cerNum);
		userService.certifiedPhoneNumber(u_phone, cerNum);
		return cerNum;
	}

	@GetMapping("/checkUserName/{userName}")
	public Boolean checkUserNameDuplicate(@PathVariable String userName) {
			return userService.isUserNameAvailable(userName);
	}

	//---------------------------------------admin------------------------------------//
	@GetMapping("/list")
	public PageResponseDto<UserDto> getUsers(PageRequestDto request) {
		return userService.getUsers(request);
	}

	// 광고 검색 API 백엔드에 추가
	@GetMapping("/search")
	public ResponseEntity<List<UserDto>> searchUser(@RequestParam String type, @RequestParam String query) {
		List<UserDto> user = userService.searchUser(type, query);
		return ResponseEntity.ok(user);
	}
}
