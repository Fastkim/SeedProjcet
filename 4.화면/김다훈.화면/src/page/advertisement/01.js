import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../UserLayout';
import MyBackButton from '../navigation/02';
// import useTo from '../../useTo';
// import Paging from '../../Paging';

/* ADVERTISEMENT.01 광고목록조회 */
const AdvertisementList = ({children}) => {
    const [advertisements, setAdvertisements] = useState([]);
    const [response, setResponse] = useState(null); // 응답 데이터를 저장
    // const { toUserAdList, page, size } = useTo();

    // useEffect(() => {
    //     fetchAdvertisements(page, size);
    // }, [page, size]);
    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await fetch(`http://localhost:8000/advertisement/list`);
            const data = await response.json();
            if (data.items && Array.isArray(data.items)) {
                setAdvertisements(data.items);
                setResponse(data);
            } else {
                setAdvertisements([]);
                console.error('Unexpected response data:', data);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
    };

    return (
        <UserLayout>
            <MyBackButton pageName={'광고목록조회'} />
            <main>
                {advertisements.map(ad => (
                    <div className='border border-dark w-72 h-96 p-4' key={ad.advertisementNo}>
                        <Link to={`/selectAdvertisement/${ad.advertisementNo}`} id='deleteLinkCss'>
                            <div className='border mb-4 p-4 text-center d-flex align-items-center justify-content-center advertisementImg'>
                                {ad.advertisementImage ? <img
                                    src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(ad.advertisementImage)))}`}
                                    alt="식당이미지"/> : '식당이미지'}
                            </div>
                        </Link>
                        <div className='border h-96 mb-4 p-4 text-start'>
                            식당명 : {ad.restaurantName}<br/>
                            광고제목 : {ad.advertisementTitle}<br/>
                            광고내용 : {ad.advertisementContent}<br/>
                            게시날짜 : {ad.createDate}
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Link to={`/selectAdvertisement/${ad.advertisementNo}`}
                                  className='btn btn-primary btn-outline-warning mt-4 p-2 btn-sm'
                                  style={{background: 'orange'}}>
                                자세히
                            </Link>
                        </div>
                    </div>
                ))}
                <hr/>
                {/*{response && (*/}
                {/*    <Paging*/}
                {/*        response={response}*/}
                {/*        toList={toUserAdList} // 페이지네이션 함수를 올바르게 전달*/}
                {/*    />*/}
                {/*)}*/}
            </main>
        </UserLayout>
    );
};

export default AdvertisementList;