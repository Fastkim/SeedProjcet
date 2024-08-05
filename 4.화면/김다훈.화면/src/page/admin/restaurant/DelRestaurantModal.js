import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delRestaurant } from '../../../api/restaurantApi';

function DelRestaurantModal({ restaurantId }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onClose = () => setShow(false);
    const onShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            await delRestaurant(restaurantId);
            navigate('/adminRestaurantDelComplete');
        } catch (error) {
            console.error("Error deleting restaurant:", error);
        }
    };

    return (
        <>
            <Button variant='warning' className='delRestaurantBtn me-2' onClick={onShow}>삭제</Button>

            <Modal show={show} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>식당 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    해당 내용을 삭제하시겠습니까?<br/>
                    (해당 식당이 삭제되며 복구할 수 없습니다.)
                    <div className='d-flex justify-content-end'>
                        <Button variant='warning' className='deleteNoBtn me-2' onClick={onClose}>
                            아니오
                        </Button>
                        <Button variant='warning' className='deleteYesBtn' onClick={handleDelete}>
                            예
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DelRestaurantModal;