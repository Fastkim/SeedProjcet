import {Link, useParams} from 'react-router-dom'
import {Row, Col, Button, Form, InputGroup} from 'react-bootstrap'
import UserLayout from './UserLayout';
import {FaSearch} from 'react-icons/fa';
import adImg from '../img/user_main/main_advertisementImg.png'


const Main = () => {
    const {userId} = useParams()
    return (
        <UserLayout userId={userId}>
            <Row className='mt-5'>
                <Col>
                    <div className='text-center fs-3 fw-bold mb-3'>환영합니다!</div>
                    <div className="searchContainer">
                        <InputGroup>
                            <Form.Control type="text" placeholder="식당명을 입력하세요" />
                            <Button variant="outlineSecondary">
                                <Link to={'/restaurantDetail'}>
                                    <FaSearch className='text-dark'/>
                                </Link>
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="textEnd">
                        <Button variant="warning" className="fw-bold fs-5 mt-4 mb-4" href='/restaurantList'>
                            식당목록보기
                        </Button>
                    </div>
                    <hr/>
                    <Row>
                        <Link to={'/advertisementList'} id='deleteLinkCss' className='mainImg p-0'>
                            <img src={adImg} className={'mainAdImg'} alt={"Advertisement"} />
                        </Link>
                    </Row>
                </Col>
            </Row>
        </UserLayout>
    )
}

export default Main