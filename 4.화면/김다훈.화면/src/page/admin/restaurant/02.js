import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addRestaurant } from '../../../api/restaurantApi';

const AdminRestaurantCreate = () => {
    const [restaurant, setRestaurant] = useState({
        restaurantName: '',
        mainMenu: '',
        businessHours: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

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
            console.error("Error adding restaurant:", error);
        }
    };

    return (
        <AdminLayout>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center mb-4">
                        <Col>
                            <div className="restaurantImageBox">
                                {image && <img src={URL.createObjectURL(image)} alt="Restaurant" />}
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
                                <Form.Control type="text" placeholder="식당 이름을 입력하세요" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mainMenu">
                                <Form.Label>대표메뉴</Form.Label>
                                <Form.Control type="text" placeholder="대표 메뉴를 입력하세요" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="businessHours">
                                <Form.Label>영업시간</Form.Label>
                                <Form.Control type="text" placeholder="영업 시간을 입력하세요" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>가격</Form.Label>
                                <Form.Control type="text" placeholder="가격을 입력하세요" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>식당 소개</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="식당 소개를 입력하세요" onChange={handleChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button variant="warning" type="submit" className="submitButton me-2">
                                    추가
                                </Button>
                                <Button variant="warning" className="cancelButton" onClick={() => navigate('/adminRestaurant')}>
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

export default AdminRestaurantCreate;