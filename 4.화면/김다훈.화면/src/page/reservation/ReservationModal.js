import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { delReservation } from '../../api/reservationApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ReservationModal() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onClose = () => setShow(false);
    const onShow = () => setShow(true);
    const {createdReservationId} = useParams()

    const onClickDel = () => {
        if(createdReservationId) {
            delReservation(createdReservationId).then(() => {
                navigate({pathname: '/reservationDeleteComplete'});
            }).catch(error => console.error(error));
        } else {
            console.error("reservationId is not defined");
        }
    };

    return (
        <>
            <Button variant='warning' className='reservationCancelBtn' onClick={onShow}>취소</Button>

            <Modal show={show} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>예약 취소</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    예약을 취소하시겠습니까?<br/>
                    <div className='d-flex justify-content-end'>
                        <Button variant='warning' className='cancelNoBtn me-2' onClick={onClose}>
                            아니오
                        </Button>
                        <Button variant='warning' className='cancelYesBtn' onClick={onClickDel}>
                            예
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ReservationModal;
