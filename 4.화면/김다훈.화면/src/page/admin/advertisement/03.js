import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../AdminLayout';
import DelAdBtn from './DelAdBtn';

const AdminAdvertisementUpdate = () => {
    const [advertisement, setAdvertisement] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [advertisementContent, setAdvertisementContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { advertisementNo } = useParams();
    const advertisementId = parseInt(advertisementNo, 10);
    const navigate = useNavigate();
    const [advertisementImage, setAdvertisementImage] = useState(null);

    useEffect(() => {
        const fetchAdvertisement = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/advertisement/details/${advertisementId}`);
                setAdvertisement(response.data);
                setRestaurantName(response.data.restaurantName);
                setAdvertisementContent(response.data.advertisementContent);
                setAdvertisementImage(response.data.advertisementImage);
            } catch (error) {
                console.error('Error fetching advertisement details', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdvertisement();
    }, [advertisementId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!advertisement) {
        return <div>Advertisement not found</div>;
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8000/advertisement/update/${advertisementId}`, {
                restaurantName,
                advertisementContent,
            });
            navigate('/adminAdvertisement');
        } catch (error) {
            console.error('Error updating advertisement', error);
        }
    };

    const handleCancel = () => {
        navigate('/adminAdvertisement');
    };

    return (
        <AdminLayout>
            <div className='mt-5'>
                <div className='text-start'>
                    <div className="mb-2">
                        <input type="text"
                               className="form-control fs-4 fw-bold w-75"
                               aria-label="Recipient's username"
                               aria-describedby="button-addon2"
                               value={restaurantName}
                               onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </div>
                    <div>{advertisement.createDate}</div>
                </div>
                <hr />
                <img src={advertisementImage || ''} alt=""  className='border mb-4 h-50 p-4 d-flex align-items-center justify-content-center text-center fs-3 fw-bold' style={{ height: '150px' }}/>
                <Row className="justify-content-center mb-4">
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" className="fileUploadButton" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="advertisement">
                    <Form.Control as="textarea" rows={10} value={advertisementContent} onChange={(e) => setAdvertisementContent(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <div className='p-1 mt-1'>
                    저작권자 씨앗미디어(주) 무단전재 및 재배포 금지
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <Button variant='warning' className='fixAdBtn me-2' onClick={handleUpdate}>수정</Button>
                    <DelAdBtn advertisementId={advertisementId} />
                    <Button variant='warning' className='backtoAdList' onClick={handleCancel}>취소</Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAdvertisementUpdate;