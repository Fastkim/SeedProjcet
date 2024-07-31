import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { addReservation } from '../../api/reservationApi';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../UserLayout';
import MyBackButton from "../navigation/02";

const ReservationCreate = () => {
    const [reservation, setReservation] = useState({
        reservationDate: '',
        peopleNum: '',
        reservationTime: '',
        price: 0, // Optional, add as necessary
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const onClickAdd = () => {
        addReservation(reservation).then(response => {
            const createdReservationId = response.reservationId;
            if(createdReservationId) {
                navigate({
                    pathname:`../reservationRead/${createdReservationId}`,
                    // search:`김다훈`
                });
            }
        }).catch(response => alert(response));
    };

    return (
        <UserLayout>
            <Row>
                <Col>
                    <div>
                        <MyBackButton pageName='예약추가'/>
                    </div>
                    <div className='text-center d-flex justify-content-center mt-5'>
                        온라인 예약<br/>
                        방문 날짜와 인원을 입력해주세요.
                    </div>
                    <Form.Group className='mb-3 mt-3 d-flex justify-content-center'>
                        <Form.Label xs='4' id='reservationDate' className='me-3'>방문날짜</Form.Label>
                        <Col xs='6'>
                            <Form.Control type='date' name='reservationDate' value={reservation.reservationDate}
                                          onChange={onChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group className='mb-3 d-flex justify-content-center'>
                        <Form.Label xs='4' id='people' className='me-3'>방문인원</Form.Label>
                        <Col xs='6'>
                            <Form.Control type='number' name='peopleNum' value={reservation.peopleNum}
                                          onChange={onChange}/>
                        </Col>
                    </Form.Group>
                    <div className='text-center d-flex justify-content-center mt-3'>
                        시간을 선택해 주세요.
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Form.Select
                            className='flex text-center w-75'
                            name="reservationTime"
                            value={reservation.reservationTime}
                            onChange={onChange}>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                        </Form.Select>
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <Button variant='warning' onClick={onClickAdd}>예약하기</Button>
                    </div>
                </Col>
            </Row>
        </UserLayout>
    );
};

export default ReservationCreate;
