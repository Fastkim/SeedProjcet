import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserLayout from '../UserLayout';
import MyBackButton from '../navigation/02';
import { getRestaurant } from '../../api/restaurantApi';

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurant(restaurantId);
      setRestaurant(data);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const handleReservation = () => {
    navigate('/reservationCreate', { state: { restaurantId: restaurant.restaurantId } });
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
      <UserLayout>
        <MyBackButton pageName={'식당 조회'}/>
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="restaurantImage">
                {restaurant.imageUrl ?
                    <img src={restaurant.imageUrl} alt={restaurant.restaurantName} /> :
                    <div className="restaurantImageContent">
                      <div>식당이미지</div>
                    </div>
                }
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>{restaurant.restaurantName}</h2>
              <p>대표메뉴: {restaurant.mainMenu}</p>
              <p>영업시간: {restaurant.businessHours}</p>
              <p>가격: {restaurant.price}원</p>
              <p>소개: {restaurant.description}</p>
              <div className="textEnd mb-5">
                <Button className="reservationBtn" onClick={handleReservation}>
                  예약하기
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </UserLayout>
  );
};

export default RestaurantDetail;