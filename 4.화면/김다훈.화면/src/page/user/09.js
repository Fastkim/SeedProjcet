import { Link } from 'react-router-dom'
import UserLayout from '../UserLayout'

/* USER.09 회원 탈퇴 */
const UserCompleteDelete = ({children}) => {
    let sessionStorage = window.sessionStorage;
    
    return (
        <UserLayout>
                <div>
                    <main>
                        {children}
                        <div className='mt-5 text-center fw-bolder'>
                            <h3>회원 탈퇴 완료</h3>
                            <hr/>
                            <div className='my-5'>회원 탈퇴 되었습니다.<br/>감사합니다.</div>
                        </div>
                        <div className='d-flex justify-content-center my-5'>
                            <Link to='/' className='d-block'>
                                <a className='btn btn-primary btn-outline-warning p-2 btn-sm'
                                    href='#'
                                    role='button'
                                    style={{ background: 'orange' }}
                                    onClick={()=> {
                                        sessionStorage.clear();}}
                                    >메인화면 바로가기</a>
                                    
                            </Link>
                        </div>
                    </main>
                </div>
        </UserLayout>
    )
}

export default UserCompleteDelete