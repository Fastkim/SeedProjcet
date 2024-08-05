import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import DelRestaurantModal from '../../admin/restaurant/DelRestaurantModal';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getRestaurant, addRestaurant } from '../../../api/restaurantApi';

const UpdateAdminRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
        restaurantName: '',
        mainMenu: '',
        businessHours: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState(null);
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
            console.error("Error fetching restaurant:", error);
        }
    };

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(restaurant).forEach(key => formData.append(key, restaurant[key]));
            if (image) formData.append('image', image);

            await addRestaurant(formData);
            navigate('/adminRestaurant');
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };

    return (
        <AdminLayout>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center mb-4">
                        <Col>
                            <div className="restaurantImageBox">
                                {image ? <img src={URL.createObjectURL(image)} alt="Restaurant" /> : <div>식당이미지</div>}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col>
                            <Form.Group controlId="image">
                                <Form.Control type="file" onChange={handleImageChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form.Group className="mb-3" controlId="restaurantName">
                                <Form.Label>식당명</Form.Label>
                                <Form.Control type="text" value={restaurant.restaurantName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mainMenu">
                                <Form.Label>대표메뉴</Form.Label>
                                <Form.Control type="text" value={restaurant.mainMenu} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="businessHours">
                                <Form.Label>영업시간</Form.Label>
                                <Form.Control type="text" value={restaurant.businessHours} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>가격</Form.Label>
                                <Form.Control type="text" value={restaurant.price} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>식당 소개</Form.Label>
                                <Form.Control as="textarea" rows={3} value={restaurant.description} onChange={handleChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <DelRestaurantModal restaurantId={restaurantId} />
                                <Button variant="warning" type="submit" className="me-2">
                                    저장
                                </Button>
                                <Button variant="warning" onClick={() => navigate('/adminRestaurant')}>
                                    취소
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default UpdateAdminRestaurant;