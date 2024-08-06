import UserLayout from "../UserLayout";
import {Form, InputGroup, Button} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import {useState, useEffect} from "react";
import {getUsers} from "../../api/userApi";
import useTo from "../useTo";
import Paging from "../Paging";
import {Link} from "react-router-dom";
import axios from "axios";
import {getMyReservations} from "../../api/reservationApi";


const MyReservation = () => {
    let sessionStorage = window.sessionStorage;
    const [refresh, setRefresh] = useState(false)
    const {toReservationGet, toReservationList, page, size} = useTo()
    const [response, setResponse] = useState(null)
    const [user, setUser] = useState([]);
    const [searchType, setSearchType] = useState('선택');
    const [searchQuery, setSearchQuery] = useState('');

    const userName = sessionStorage.getItem("user_Name");
    useEffect(() => {
        getMyReservations({page, size, userName} ).then(response => setResponse(response))
    }, [page, size, refresh, userName])


    // // 검색 함수
    // const searchUser = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/user/search', {
    //             params: {
    //                 type: searchType,
    //                 query: searchQuery
    //             }
    //         });
    //         alert(response.data)
    //         setResponse(response.data);
    //
    //     } catch (error) {
    //         console.error('Error searching advertisements', error);
    //     }
    // };

    // 컴포넌트가 마운트될 때 광고 목록을 가져옴

    return (
        <UserLayout>
            <div className={'mt-5'}>
                <div className='text-start fw-bold' style={{fontSize: '20px', marginBottom: 15}}> 내 예약목록</div>
                <div className='pt-3'>
                    <table className="table table-hover text-center ">
                        <thead className='table-secondary'>
                        <tr >
                            <th scope="col" className={"text-center align-middle"}>식별번호</th>
                            <th scope="col" className={"text-center align-middle"}>식당명</th>
                            <th scope="col" className={"text-center align-middle"}>예약인원</th>
                            <th scope="col" className={"text-center align-middle"}>예약<br/>날짜</th>
                            <th scope="col" className={"text-center align-middle"}>예약시간</th>
                        </tr>
                        </thead>
                        <tbody className='link-dark'>
                        {response ? response.items.map(reservation =>
                            <tr key={reservation.reservationId} onClick={() => {
                                setRefresh(!refresh)
                                toReservationGet(reservation.reservationId)}}>
                                <td scope="row" className='link-dark'>
                                    {reservation.reservationId}
                                </td>
                                <td>
                                    {reservation.restaurantName}
                                </td>
                                <td>
                                    {reservation.peopleNum}
                                </td>
                                <td>
                                    {reservation.reservationDate}
                                </td>
                                <td>
                                    {reservation.reservationTime}
                                </td>
                            </tr>
                        ) : <></>}
                        </tbody>
                    </table>
                </div>
                {/*부트스트랩 페이지네이션 (비동기처리 해야함)*/}
                {response ? <Paging response={response} toList={toReservationList}/> : <></>}

                {/* 검색바 */}
                <div className="searchContainer">
                    <Form.Select className="searchSelect" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option>제목</option>
                        <option>식별번호</option>
                        <option>이름</option>
                        <option>ID</option>
                    </Form.Select>
                    <InputGroup>
                        <Form.Control type="text" placeholder="검색어를 입력하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        {/*<Button variant="outlineSecondary" onClick={searchUser}>*/}
                        {/*    <FaSearch/>*/}
                        {/*</Button>*/}
                    </InputGroup>
                </div>
            </div>
        </UserLayout>
    )
}

export default MyReservation