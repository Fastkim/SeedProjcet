import AdminLayout from '../AdminLayout';
import { Link } from 'react-router-dom'

const AdminAdvertisementDelComplete = () => {
    return (
        <AdminLayout>
            <div>
                <div className='mt-5 text-center fw-bolder'>
                    <h3 className='fw-bolder'>광고 삭제 완료</h3>
                    <hr style={{ width: '50%', margin: '0 auto' }}/>
                    <div className='my-5'>광고 삭제가 정상적으로 처리되었습니다.</div>
                </div>
                <div className='d-flex justify-content-center my-5'>
                    <Link to='/adminAdvertisement' className='d-block'>
                        <a className='btn btn-primary btn-outline-warning p-2 btn-sm'
                           href='#'
                           role='button'>광고목록화면 바로가기</a>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminAdvertisementDelComplete