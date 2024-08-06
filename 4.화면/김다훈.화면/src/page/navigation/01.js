import {Button, Offcanvas, Navbar, Container, Row, Col} from 'react-bootstrap'
import {Justify} from 'react-bootstrap-icons'
import { useState } from 'react';


const NavCanvas = ({userId}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let sessionStorage = window.sessionStorage;
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="ms-2 p-1">
                <Justify className='fs-2' href='/'/>
            </Button>
            <Offcanvas show={show} onHide={handleClose}  placement='end' className='offCanvasStandard'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className='fs-2'>맛있당</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='fw-bold mb-3'>-여기 맛있당-</div>
                    {sessionStorage.getItem("user_Name") ? (
                        <Row >
                         <Col>
                             <Navbar >
                             <Navbar.Brand className='ms-2' href='/userLogin' onClick={()=> {
                                    sessionStorage.clear();
                                }}>로그아웃</Navbar.Brand>
                             </Navbar>
                             <Navbar>
                                 <Container>
                                 <Navbar.Brand href="/reservationCreate">음식점 예약하기</Navbar.Brand>
                                 </Container>
                             </Navbar>
                             <Navbar>
                                 <Container>
                                 <Navbar.Brand href={`/myReservation/${userId}`}>내 예약</Navbar.Brand>
                                 </Container>
                             </Navbar>
                             <Navbar>
                                 <Container>
                                 <Navbar.Brand href="/advertisementList">광고</Navbar.Brand>
                                 </Container>
                             </Navbar>
                             <Navbar>
                                 <Container>
                                    <Navbar.Brand href={`/userUpdate/${userId}`}>회원 수정</Navbar.Brand>
                                 </Container>
                             </Navbar>
                             <div className='fw-bold mb-3 mt-4'>-고객센터-</div>
                             <Navbar>
                                 <Container>
                                 <Navbar.Brand href="/inquiryList">문의하기</Navbar.Brand>
                                 </Container>
                             </Navbar>
                         </Col>
                     </Row>
                    ):(<Container><Navbar.Brand href="/userLogin">로그인</Navbar.Brand></Container>)}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default NavCanvas

    
