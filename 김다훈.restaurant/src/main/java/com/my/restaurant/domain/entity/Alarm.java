package com.my.restaurant.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="alarms")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY, generator="alarmSequence")
    @SequenceGenerator(name="alarmSequence", sequenceName="alarm_seq", allocationSize=1)
    private Long alarmId;
    private String alarmMessage;
}
