import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, Pagination } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getRestaurants } from '../../../api/restaurantApi';

const AdminRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('주소');

    useEffect(() => {
        fetchRestaurants();
    }, [currentPage, searchTerm, searchCategory]);

    const fetchRestaurants = async () => {
        try {
            const response = await getRestaurants(currentPage, searchTerm, searchCategory);
            setRestaurants(response.restaurants);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchRestaurants();
    };

    return (
        <AdminLayout>
            <div className="restaurantListContainer">
                <div className='text-start fw-bold' style={{ fontSize: '20px' }}> 식당목록 </div>
                <div className='pt-3'>
                    <table className='text-center table table-hover'>
                        <thead className='table-secondary'>
                        <tr>
                            <th>식별번호</th>
                            <th>업소명</th>
                            <th>주소</th>
                            <th>음식 종류</th>
                        </tr>
                        </thead>
                        <tbody>
                        {restaurants.map(restaurant => (
                            <tr key={restaurant.restaurantId}>
                                <th scope='row'>
                                    <Link to={`/adminRestaurantUpdate/${restaurant.restaurantId}`} className='link-dark'>
                                        {restaurant.restaurantId}
                                    </Link>
                                </th>
                                <td>
                                    <Link to={`/adminRestaurantUpdate/${restaurant.restaurantId}`} className='link-dark'>
                                        {restaurant.restaurantName}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/adminRestaurantUpdate/${restaurant.restaurantId}`} className='link-dark'>
                                        {restaurant.address}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/adminRestaurantUpdate/${restaurant.restaurantId}`} className='link-dark'>
                                        {restaurant.restaurantCategory}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Pagination className='d-flex justify-content-center p-4'>
                    <Pagination.First onClick={() => setCurrentPage(1)} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                    {[...Array(totalPages).keys()].map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => setCurrentPage(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                </Pagination>
                <Form onSubmit={handleSearch}>
                    <div className="searchContainer">
                        <Form.Select
                            className="searchSelect"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                        >
                            <option>주소</option>
                            <option>식별번호</option>
                            <option>업소명</option>
                            <option>편의성</option>
                            <option>음식 종류</option>
                        </Form.Select>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="warning" type="submit">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </div>
                </Form>
                <Link className="addRestaurantContainer" to='/adminRestaurantCreate'>
                    <Button variant="warning">식당추가</Button>
                </Link>
            </div>
        </AdminLayout>
    );
};

export default AdminRestaurant;