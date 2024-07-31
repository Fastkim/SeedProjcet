import UserLayout from '../UserLayout';
import {Button} from 'react-bootstrap';

const ReservationDeleteComplete = () => {
    return (
        <UserLayout>
            <h2 className='d-flex justify-content-center mt-5 fw-bold'>
                예약 취소 완료
            </h2>
            <div className='d-flex justify-content-center mt-n3'>
                <hr style={{width: '15rem'}}/>
            </div>
            <p className='d-flex justify-content-center mt-3 text-center mb-4' style={{fontSize: '1.3rem'}}>
                예약이 취소되었습니다.<br/>
                감사합니다.
            </p>
            <div className='d-flex justify-content-center'>
                <a href='/restaurantList'>
                    <Button variant='warning' className='mb-5'>식당목록 바로가기</Button>
                </a>
            </div>
        </UserLayout>
    )
}

export default ReservationDeleteComplete