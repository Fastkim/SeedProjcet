import {Link} from 'react-router-dom'
import {Row, Col, Button, Dropdown} from 'react-bootstrap'
import {BellFill, XLg} from 'react-bootstrap-icons';
import NavCanvas from './navigation/01'
import logoImg from '../img/logo/FREEFOOD.png'

const Header = ({userId}) => {
    let sessionStorage = window.sessionStorage;
    return (
        <header>
            <Row id='header'>
                <Col>
                    <Row>
                        <Col xs={4}></Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={4}>
                            <Link to={'/'} id='deleteLinkCss'>
                                <img src={`${logoImg}`} className='logo_img bg-light d-flex align-items-center justify-content-center text-center'>
                                </img>
                            </Link>
                        </Col>
                        <Col className='mt-3' xs={4}>
                            <div className="float-end d-flex align-items-center justify-content-center">
                                {sessionStorage.getItem("user_Name") ? (
                                    <>
                                        <Dropdown className="">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={"d-flex align-items-center justify-content-center"}>
                                                <BellFill className="fs-3 me-2"/>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="border border-dark">
                                                <Dropdown.Item href="#/action-1" id='dropDown'
                                                               className="border-bottom border-dark d-flex">
                                                    <p>회원님의 예약이 취소되었습니다.</p><XLg className="float-end fs-4 ms-2 mt-1"/>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-1" id='dropDown'
                                                               className="border-bottom border-dark d-flex">
                                                </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" id='dropDown' className="d-flex">
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                ) : (<Button className='me-1' id='login' href='/userLogin'>로그인</Button>)}
                                <NavCanvas userId={userId}/>
                            </div>
                            {sessionStorage.getItem("user_Name") ?
                                (<div className="d-flex w-100 aligin-items-center justify-content-end mt-5 fw-bold me-1 ID">{sessionStorage.getItem("user_Name")}님</div>)
                                : (<></>)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </header>
    )
}



export default Header