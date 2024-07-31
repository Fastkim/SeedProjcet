package com.my.restaurant.service;

import com.my.restaurant.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final AlarmRepository alarmRepository;

    @Override
    public void getAlarms() {
        alarmRepository.findAll();
    }

    @Override
    public void delAlarm(Long alarmId) {
        alarmRepository.deleteById(alarmId);
    }
}
