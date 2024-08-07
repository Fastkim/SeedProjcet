package com.my.restaurant.service.restaurantService;

import com.my.restaurant.domain.dto.restaurantDto.RestaurantDto;

import java.util.List;

public interface RestaurantService {
    List<RestaurantDto> getAllRestaurants();
    RestaurantDto getRestaurantById(Long id);
    void addRestaurant(RestaurantDto restaurantDto);
    void deleteRestaurant(Long id);
}