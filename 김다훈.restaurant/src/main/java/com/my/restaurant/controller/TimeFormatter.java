package com.my.restaurant.controller;

import org.springframework.format.Formatter;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class TimeFormatter implements Formatter<LocalTime> {
    @Override
    public LocalTime parse(String str, Locale locale) {
        return LocalTime.parse(str, DateTimeFormatter.ofPattern("HH:mm", locale));
    }

    @Override
    public String print(LocalTime time, Locale locale) {
        return DateTimeFormatter.ofPattern("HH:mm").format(time);
    }
}
// 예약 시간의 경우 화면상에서 HH:mm 으로 표기하게 함.(ex) 19시 30분 => 19:30)
// 화면상에서 HH:mm으로 표시하려면 다른 방법이 있어야 하나..??
// Postman test 결과 01-JAN-70 08.00.00.000000 PM(1970년 1월 1일 오후 8시 0분 0초)로 출력된다.
// 두 번째 세 번째 시도 결과 400, 415 에러 등이 발생한다.