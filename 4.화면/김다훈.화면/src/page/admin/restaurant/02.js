import React, {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addRestaurant } from '../../../api/restaurantApi';

const AdminRestaurantCreate = () => {

    // const [restaurantId, setRestaurantId] = useState('');
    // const [restaurantName, setRestaurantName] = useState('');
    // const [restaurantCategory, setRestaurantCategory] = useState('');
    // const [businessHours, setBusinessHours] = useState('');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState('');
    // const [restaurantImg, setRestaurantImg] = useState(null);


    const [restaurant, setRestaurant] = useState({
        restaurantId: '',
        restaurantName: '',
        restaurantCategory: '',
        businessHours: '',
        price: '',
        description: '',
        restaurantImg: ''
    });

    const navigate = useNavigate();

    const onChange = e => {
        restaurant[e.target.name] = e.target.value
        setRestaurant({...restaurant})
    }


    const handleSubmit = useCallback(() => {
       addRestaurant(restaurant).then(response => alert(response))
    }, [restaurant]);

    const restaurantImg = ((e) => {
        restaurant.restaurantImg = (URL.createObjectURL(e.target.files[0]));
        setRestaurant({...restaurant})
    })

    return (
        <AdminLayout>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center mb-4">
                        <Col>
                            <div className="restaurantImageBox">
                                <img src={`${restaurant.restaurantImg}`} alt={'restaurant'}/>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col>
                            <Form.Group controlId="formFile">
                                <Form.Control type="file"
                                              onChange={restaurantImg}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form.Group className="mb-3" controlId="restaurantName">
                                <Form.Label>식당명</Form.Label>
                                <Form.Control type="text" placeholder="식당 이름을 입력하세요" name={'restaurantName'} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mainMenu">
                                <Form.Label>대표메뉴</Form.Label>
                                <Form.Control type="text" placeholder="대표 메뉴를 입력하세요" name={'restaurantCategory'} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="businessHours">
                                <Form.Label>영업시간</Form.Label>
                                <Form.Control type="text" placeholder="영업 시간을 입력하세요" name={'businessHours'} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>가격</Form.Label>
                                <Form.Control type="text" placeholder="가격을 입력하세요" name={'price'} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>식당 소개</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="식당 소개를 입력하세요" name={'description'} onChange={onChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button variant="warning" className="submitButton me-2" onClick={handleSubmit}>
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