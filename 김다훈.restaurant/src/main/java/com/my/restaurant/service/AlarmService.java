package com.my.restaurant.service;

import com.my.restaurant.domain.dto.AlarmDto;

import java.util.List;

public interface AlarmService {
    void getAlarms();
    void delAlarm(Long alarmId);
}
