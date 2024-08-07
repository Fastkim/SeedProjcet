package com.my.restaurant.service.userService;

import com.my.restaurant.domain.dto.PageRequestDto;
import com.my.restaurant.domain.dto.PageResponseDto;
import com.my.restaurant.domain.dto.userDto.*;

import java.util.List;

public interface UserService {
	PageResponseDto<UserDto> getUsers(PageRequestDto request);
	void userUpdate(UserUpdateDto userUpdateDto);
	UserDto getUser(Long userId);
	UserLoginDto findBy(UserLoginDto params);
	String findBy_UserName(String personalName, String userEmail);
	String findBy_pw(String personalName, String userEmail, String phoneNumber);
	void passwordFix(UserPwFixDto userPwFixDto);
	void addUser(UserSignUpDto userSignUpDto);
	void delUser(Long userId);
	void certifiedPhoneNumber(String u_phone, String cerNum);
	Boolean isUserNameAvailable(String userName);
	List<UserDto> searchUser(String type, String query);
}
