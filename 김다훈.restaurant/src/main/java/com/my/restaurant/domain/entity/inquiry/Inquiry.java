package com.my.restaurant.domain.entity.inquiry;

import com.my.restaurant.domain.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="inquirys")
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "inquirySequence")
    @SequenceGenerator(name = "inquirySequence", sequenceName = "inquiry_seq", allocationSize = 1)
    private Long inquiryId;

    @Column(nullable = false)
    private String inquiryTitle;

    @Column(nullable = false)
    private String inquiryAuthor;

    @Column(nullable = false)
    private LocalDateTime inquiryCreatedAt;

    @Column(nullable = false)
    private int inquiryViewCount;

    @Column(nullable = false, length = 1000)
    private String inquiryContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}