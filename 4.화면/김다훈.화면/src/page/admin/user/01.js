import AdminLayout from '../AdminLayout';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import {useState, useEffect} from "react";
import {getUsers} from "../../../api/userApi";
import useTo from "../../useTo";
import Paging from "../../Paging";
import {Link} from "react-router-dom";
import axios from "axios";


const AdminUser = () => {
    const [refresh, setRefresh] = useState(false)
    const {toGet, toList, page, size} = useTo()
    const [response, setResponse] = useState(null)
    const [user, setUser] = useState([]);
    const [searchType, setSearchType] = useState('선택');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getUsers({page, size}).then(response => setResponse(response))
    }, [page, size, refresh])


    // 검색 함수
    const searchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/search', {
                params: {
                    type: searchType,
                    query: searchQuery
                }
            });
            alert(response.data)
            setResponse(response.data);

        } catch (error) {
            console.error('Error searching advertisements', error);
        }
    };

    // 컴포넌트가 마운트될 때 광고 목록을 가져옴

    return (
        <AdminLayout>
            <div>
                <div className='text-start fw-bold' style={{fontSize: '20px'}}> 회원목록</div>
                <div className='pt-3'>
                    <table className="table table-hover text-center">
                        <thead className='table-secondary'>
                        <tr>
                            <th scope="col">식별번호</th>
                            <th scope="col">이름</th>
                            <th scope="col">전화번호</th>
                            <th scope="col">ID</th>
                            <th scope="col">가입일</th>
                        </tr>
                        </thead>
                        <tbody className='link-dark'>
                            {response ? response.items.map(user =>
                                <tr key={user.userId} onClick={() => {
                                    setRefresh(!refresh)
                                    toGet(user.userId)}}>
                                    <td scope="row" className='link-dark'>
                                        {user.userId}
                                    </td>
                                    <td>
                                        {user.personalName}
                                    </td>
                                    <td>
                                        {user.phoneNumber}
                                    </td>
                                    <td>
                                        {user.userName}
                                    </td>
                                    <td>
                                        {user.birthDay}
                                    </td>
                                </tr>
                            ) : <></>}
                        </tbody>
                    </table>
                </div>
                {/*부트스트랩 페이지네이션 (비동기처리 해야함)*/}
                {response ? <Paging response={response} toList={toList}/> : <></>}

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
                        <Button variant="outlineSecondary" onClick={searchUser}>
                            <FaSearch/>
                        </Button>
                    </InputGroup>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminUser