package com.my.restaurant.repository.reservationRepository;

import com.my.restaurant.domain.entity.reservation.Reservation;
import com.my.restaurant.domain.entity.restaurant.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
//    List<Reservation> findByUser_UserName(String userName);

//    @Query(value = "SELECT * FROM ( " +
//            "  SELECT r.*, ROW_NUMBER() OVER (ORDER BY r.reservation_id DESC) AS rn " +
//            "  FROM reservations r " +
//            "  JOIN users u ON r.user_id = u.user_id " +
//            "  WHERE u.user_name = :userName " +
//            ") WHERE rn BETWEEN :startRow AND :endRow",
//            nativeQuery = true)
//    List<Reservation> findReservationsByUserNameWithPagination(@Param("userName") String userName,
//                                                               @Param("startRow") int startRow,
//                                                               @Param("endRow") int endRow);
//
//    @Query("SELECT COUNT(r) FROM Reservation r JOIN r.user u WHERE u.userName = :userName")
//    long countReservationsByUserName(@Param("userName") String userName);
}
