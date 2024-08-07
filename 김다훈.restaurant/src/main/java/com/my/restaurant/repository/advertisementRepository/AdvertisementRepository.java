package com.my.restaurant.repository.advertisementRepository;

import com.my.restaurant.domain.entity.advertisement.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    @Query
    Advertisement findByAdvertisementNo(Long advertisementNo);
    //Optional<Advertisement> findByAdvertisementNo(Long advertisementNo);
    List<Advertisement> findByRestaurantNameContaining(String restaurantName);
    List<Advertisement> findByCreateDate(LocalDate createDate);
    List<Advertisement> findByCreateDateBetween(LocalDate startDate, LocalDate endDate);    // 날짜 범위로 검색

    @Query(value = "SELECT * FROM ( " +
            "  SELECT a.*, ROW_NUMBER() OVER (ORDER BY a.advertisement_no DESC) AS rn " +
            "  FROM Advertisements a " +
            ") WHERE rn BETWEEN :startRow AND :endRow",
            nativeQuery = true)
    List<Advertisement> findAdvertisementsWithPagination(@Param("startRow") int startRow, @Param("endRow") int endRow);

    @Query("SELECT COUNT(a) FROM Advertisement a")
    long countAdvertisements();

    @Query("SELECT a FROM Advertisement a WHERE a.advertisementNo = :advertisementNo OR a.restaurantName LIKE %:restaurantName%")
    List<Advertisement> searchAdvertisements(@Param("advertisementNo") Long advertisementNo, @Param("restaurantName") String restaurantName);
}