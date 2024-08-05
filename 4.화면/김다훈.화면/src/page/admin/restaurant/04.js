import React from 'react';
import AdminLayout from '../AdminLayout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeleteAdminRestaurant = () => {
    return (
        <AdminLayout>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6} className="text-center">
                        <div className="mb-4 fw-bold fs-4">식당 삭제 완료</div>
                        <hr className="mb-4" />
                        <p className="mb-5">식당 삭제가 정상적으로 처리되었습니다.</p>
                        <div className='d-flex justify-content-center my-5'>
                            <Link to='/adminRestaurant'>
                                <Button variant="warning" className="btn-outline-warning p-2 btn-sm">
                                    식당목록화면 바로가기
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
}

export default DeleteAdminRestaurant;