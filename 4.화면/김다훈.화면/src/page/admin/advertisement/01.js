import AdminLayout from '../AdminLayout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import useTo from "../../useTo";
import Paging from "../../Paging";
import {getAdvertisement} from "../../../api/advertisementApi";

const AdminAdList = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const {toAdvertisementGet, toAdvertisementList, page, size} = useTo();
    const [response, setResponse] = useState(null);
    const [searchType, setSearchType] = useState('선택');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');             // Admin 작성일 검색 (시작날짜)
    const [endDate, setEndDate] = useState('');                 // Admin 작성일 검색 (끝날짜)

    //광고 목록을 가져오는 함수
    const fetchAdvertisements = async () => {
        try {
            const response = await axios.get('http://localhost:8000/advertisement/list');
            setAdvertisements(response.data.items);
        } catch (error) {
            console.error('Error fetching advertisements', error);
        }
    };

    // 검색 함수
    const searchAdvertisements = async () => {
        try {
            let response;
            if (searchType === '선택') {
                response = await axios.get('http://localhost:8000/advertisement/list');
            } else if (searchType === '작성일' && startDate && endDate) {
                response = await axios.get('http://localhost:8000/advertisement/searchByDateRange', {
                    params: { startDate, endDate }
                });
            } else {
                response = await axios.get('http://localhost:8000/advertisement/search', {
                    params: { type: searchType, query: searchQuery }
                });
            }
            setAdvertisements(response.data.items);
        } catch (error) {
            console.error('Error searching advertisements', error);
        }
    };

    // 컴포넌트가 마운트될 때 광고 목록을 가져오는 함수
    useEffect(() => {
        getAdvertisement({ page, size }).then(response => setResponse(response));
    }, [page, size, refresh]);

    return (
        <AdminLayout>
            <div className='me-4 ms-2'>
                <div className='text-start fw-bold' style={{ fontSize: '20px' }}> 광고목록 </div>
                <div className='pt-3'>
                    <table className="table table-hover text-center">
                        <thead className='table-secondary'>
                        <tr>
                            <th scope="col">식별번호</th>
                            <th scope="col">식당명</th>
                            <th scope="col">작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {response ? response.items.map(advertisement =>
                            <tr key={advertisement.advertisementNo} onClick={() => {
                                setRefresh(!refresh);
                                toAdvertisementGet(advertisement.advertisementNo);
                            }}>
                                <td scope="row" className={"link-dark"}>
                                    {advertisement.advertisementNo}
                                </td>
                                <td>
                                    {advertisement.restaurantName}
                                </td>
                                <td>
                                    {new Date(advertisement.createDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ) : <></>}
                        </tbody>
                    </table>
                </div>

                {response ? <Paging response={response} toList={toAdvertisementList} /> : <></>}

                <div className='searchContainer'>
                    <Form.Select className="searchSelect" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option>선택</option>
                        <option>식별번호</option>
                        <option>식당명</option>
                        <option>작성일</option>
                    </Form.Select>
                    {searchType === '작성일' && (
                        <div className="searchContainer">
                            <div className="dateInputs">
                                <Form.Control
                                    type="date"
                                    className="dateInput"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <span className="mx-2">~</span>
                                <Form.Control
                                    type="date"
                                    className="dateInput"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    <InputGroup className="mt-2">
                        <Form.Control type="text" placeholder="검색어를 입력하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <Button variant="outline-secondary" onClick={searchAdvertisements}>
                            <FaSearch />
                        </Button>
                    </InputGroup>
                </div>
                <div className='d-flex justify-content-end mb-5'>
                    <Link to='/adminAdvertisementCreate' className='btn btn-primary btn-outline-warning p-2 btn-sm' style={{ background: 'orange' }}>
                        광고 작성
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAdList;