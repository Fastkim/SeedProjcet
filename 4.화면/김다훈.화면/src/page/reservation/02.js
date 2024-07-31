import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { getReservation } from "../../api/reservationApi";
import UserLayout from '../UserLayout';
import {Row, Col, Card, Button} from 'react-bootstrap';
import MyBackButton from "../navigation/02";
import ReservationModal from "./ReservationModal";

const ReservationRead = () => {
    const [reservation, setReservation] = useState({
        reservationId: 0,
        reservationDate: '',
        restaurantName: '',
        price: 0,
        reservationTime: '',
        peopleNum: ''
    });
    const {createdReservationId} = useParams()
    reservation.reservationId = createdReservationId; // createdReservationId ==> 새로 만들어진 예약번호

    // alert({})
    // const importReservationId = reservationId;
    // alert(importReservationId)use
    // setReservation(...importReservationId);

    useEffect(() => {
         getReservation(createdReservationId).then(reservation => {
             setReservation(reservation);
         }).catch(error => console.error(error));
     }, [createdReservationId]);

    return (
        <UserLayout>
            <div>
                <MyBackButton pageName='예약조회'/>
            </div>
            <Card className='mt-5 mb-5 border border-0'>
                <Row className='no-gutters'>
                    <Col>
                        <div className='restaurant-img text-center'>
                            <div className='restaurant-text'>식당이미지</div>
                        </div>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Text>
                                예약번호: {reservation.reservationId}<br/>
                                식당명: {reservation.restaurantName}<br/>
                                금액: {reservation.price}원<br/>
                                인원수: {reservation.peopleNum}명<br/>
                                예약일: {reservation.reservationDate}<br/>
                                예약시간: {reservation.reservationTime}
                            </Card.Text>
                            <div className='d-flex justify-content-end'>
                                <Link to={'/restaurantList'}>
                                    <Button variant='warning' className='me-2 backtoRestaurantBtn'>확인</Button>
                                </Link>
                                <ReservationModal/>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </UserLayout>
    );
};

export default ReservationRead;
