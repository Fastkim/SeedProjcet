import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../UserLayout';
import MyBackButton from '../navigation/02';

{/* ADVERTISEMENT.02 광고조회 */}
const SelectAdvertisement = ({children}) => {
    const { advertisementNo } = useParams();
    const [advertisement, setAdvertisement] = useState(null);

    useEffect(() => {
        // 광고 상세 정보를 가져오는 API 호출
        fetch(`http://localhost:8000/advertisement/details/${advertisementNo}`)
            .then(response => response.json())
            .then(data => setAdvertisement(data))
            .catch(error => console.error('Error fetching advertisement details:', error));
    }, [advertisementNo]);

    if (!advertisement) return <div>로..딩...중....</div>;

    return (
        <UserLayout>
            <MyBackButton pageName={'광고조회'} />
            <main>
                <div className='my-5 text-start'>
                    <div className='fw-bold fs-4'>
                        {advertisement.restaurantName}
                    </div>
                    <div>
                        {advertisement.createDate}
                    </div>
                </div>
                <hr />
                <div className='border w-72 h-96 mb-4 p-4 advertisementImg d-flex align-items-center justify-content-center'>
                    {advertisement.advertisementImage ? <img src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(advertisement.advertisementImage)))}`} alt="식당이미지" /> : '식당이미지'}
                </div>
                <div className='border h-96 mb-4 p-4 text-start'>
                    {advertisement.advertisementContent}<br />
                </div>
                <hr />
                <div className='p-1 mb-4'>
                    이 게시물은 (주)맛있당에 관리 권한이 있음.
                </div>
            </main>
        </UserLayout>
    );
};

export default SelectAdvertisement;