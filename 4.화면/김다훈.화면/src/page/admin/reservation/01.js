import AdminLayout from '../AdminLayout';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa'; 
import {Link} from 'react-router-dom';

const AdminReservation = () => {
    const reservations = [
        {reservationId: 1, reservationDate: '2024-07-11', price: 16000, restaurantName: '김삼보', peopleNum: 2},
        {reservationId: 2, reservationDate: '2024-07-11', price: 12000, restaurantName: '시골밥상', peopleNum: 1},
        {reservationId: 3, reservationDate: '2024-07-11', price: 16000, restaurantName: '명륜진사갈비', peopleNum: 2},
        {reservationId: 4, reservationDate: '2024-07-11', price: 12000, restaurantName: '락궁', peopleNum: 2},
        {reservationId: 5, reservationDate: '2024-07-11', price: 8000, restaurantName: '천지천', peopleNum: 1},
        {reservationId: 6, reservationDate: '2024-07-11', price: 23000, restaurantName: '비룡각', peopleNum: 4},
        {reservationId: 7, reservationDate: '2024-07-10', price: 16000, restaurantName: '탕후루', peopleNum: 3}
    ]

    return (
        <AdminLayout>
            <div className='text-start fw-bold' style={{ fontSize: '20px' }}>최근 예약내역</div>
            <div className='pt-3'>
                <table className="table table-hover text-center">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope='col'>예약번호</th>
                            <th scope='col'>예약일</th>
                            <th scope='col'>금액</th>
                            <th scope='col'>식당명</th>
                            <th scope='col'>인원수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <th scope='row'>
                                <Link variant='link-dark' to={`/adminReservationRead/${reservation.reservationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {reservation.reservationId}
                                </Link>
                            </th>
                            <td>
                                <Link variant='link-dark' to={`/adminReservationRead/${reservation.reservationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {reservation.reservationDate}
                                </Link>
                            </td>
                            <td>
                                <Link variant='link-dark' to={`/adminReservationRead/${reservation.reservationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {reservation.price}
                                </Link>
                            </td>
                            <td>
                                <Link variant='link-dark' to={`/adminReservationRead/${reservation.reservationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {reservation.restaurantName}
                                </Link>
                            </td>
                            <td>
                                <Link variant='link-dark' to={`/adminReservationRead/${reservation.reservationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {reservation.peopleNum}
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" className='d-flex justify-content-center p-4' >
                    <ul className="pagination" id='paging'>
                        <li className="page-item" id='paging' >
                            <a className="page-link" aria-label="Previous" id='paging'>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item" ><a className="page-link" href="#" id='paging'>1</a></li>
                        <li className="page-item"><a className="page-link" href="#" id='paging'>2</a></li>
                        <li className="page-item"><a className="page-link" href="#" id='paging'>3</a></li>
                        <li className="page-item"><a className="page-link" href="#" id='paging'>4</a></li>
                        <li className="page-item"><a className="page-link" href="#" id='paging'>5</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next" id='paging'>
                                <span aria-hidden="true" >&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="searchContainer">
                    <Form.Select className="searchSelect">
                        <option>예약번호</option>
                        <option>예약일</option>
                        <option>식당명</option>
                    </Form.Select>
                    <InputGroup>
                        <Form.Control type="text" placeholder="검색어를 입력하세요" />
                        <Button variant="outlineSecondary">
                            <FaSearch />
                        </Button>
                    </InputGroup>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminReservation