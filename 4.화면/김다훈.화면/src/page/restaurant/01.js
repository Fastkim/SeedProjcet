import React, { useState, useEffect } from 'react';
import UserLayout from '../UserLayout';
import { Link } from 'react-router-dom';
import { Row, Col, Pagination } from 'react-bootstrap';
import MyBackButton from '../navigation/02';
import { getRestaurants } from '../../api/restaurantApi';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchRestaurants();
    }, [currentPage]);

    const fetchRestaurants = async () => {
        try {
            const response = await getRestaurants(currentPage);
            setRestaurants(response.restaurants);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    return (
        <UserLayout>
            <MyBackButton pageName={'식당 목록'}/>
            {restaurants.map((restaurant, index) => (
                index % 2 === 0 && (
                    <React.Fragment key={restaurant.restaurantId}>
                        <Row>
                            <Col>
                                <Link to={`/restaurantDetail/${restaurants[index].restaurantId}`} id='deleteLinkCss'>
                                    <div className='restaurantImg'>
                                        {restaurant.imageUrl ?
                                            <img src={restaurant.imageUrl} alt={restaurant.restaurantName} /> :
                                            <div>식당이미지</div>
                                        }
                                    </div>
                                    <div className='restaurantName'>{restaurants[index].restaurantName}</div>
                                </Link>
                            </Col>
                            {restaurants[index + 1] && (
                                <Col>
                                    <Link to={`/restaurantDetail/${restaurants[index + 1].restaurantId}`} id='deleteLinkCss'>
                                        <div className='restaurantImg'>
                                            {restaurants[index + 1].imageUrl ?
                                                <img src={restaurants[index + 1].imageUrl} alt={restaurants[index + 1].restaurantName} /> :
                                                <div>식당이미지</div>
                                            }
                                        </div>
                                        <div className='restaurantName'>{restaurants[index + 1].restaurantName}</div>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </React.Fragment>
                )
            ))}
            <Pagination className='d-flex justify-content-center p-4'>
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => setCurrentPage(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </Pagination>
        </UserLayout>
    );
};

export default RestaurantList;