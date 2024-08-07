import {createBrowserRouter} from 'react-router-dom';
import {Suspense} from 'react';
import Main from '../page/Main';

import UserLogin from '../page/user/01'
import UserSignUp from '../page/user/02'
import UserCompleteSignUp from '../page/user/03';
import UserFindId from '../page/user/04';
import UserFindPw from '../page/user/05';
import UserPwUpdate from '../page/user/06';
import UserUpdate from '../page/user/07';
import UserCompleteUpdate from '../page/user/08';
import UserCompleteDelete from '../page/user/09';

import RestaurantList from '../page/restaurant/01';
import RestaurantDetail from '../page/restaurant/02';

import AdvertisementList from '../page/advertisement/01';
import SelectAdvertisement from '../page/advertisement/02';

import ReservationCreate from '../page/reservation/01';
import ReservationRead from '../page/reservation/02';
import ReservationDeleteComplete from '../page/reservation/03';
import MyReservation from "../page/reservation/04";

import InquiryList from '../page/inquiry/01';
import InquiryCreate from '../page/inquiry/02';
import InquiryRead from '../page/inquiry/03';
import InquiryDeleteComplete from '../page/inquiry/04';
import InquiryUpdate from '../page/inquiry/05';
import InquiryMyList from '../page/inquiry/06';

import AdminMain from '../page/admin/Main';
import AdminUser from '../page/admin/user/01';
import AdminUserList from '../page/admin/user/02';
import AdminUserDeleteComplete from '../page/admin/user/03';

import AdminRestaurant from '../page/admin/restaurant/01';
import AdminRestaurantCreate from '../page/admin/restaurant/02';
import AdminRestaurantUpdate from '../page/admin/restaurant/03';
import AdminRestaurantDelComplete from '../page/admin/restaurant/04';

import AdminReservation from '../page/admin/reservation/01';
import AdminReservationRead from '../page/admin/reservation/02';
import AdminReservationDelComplete from '../page/admin/reservation/03';

import AdminAdvertisement from '../page/admin/advertisement/01';
import AdminAdvertisementCreate from '../page/admin/advertisement/02';
import AdminAdvertisementUpdate from '../page/admin/advertisement/03';
import AdminAdDeleteComplete from '../page/admin/advertisement/04';

import AdminAnswer from '../page/admin/inquiry/01';
import AdminAnswerCreate from '../page/admin/inquiry/02';
import AdminFixAnswer from '../page/admin/inquiry/03';
import AdminAnswerDelComplete from '../page/admin/inquiry/04';
import NavCanvas from "../page/navigation/01";

const rootRouter = createBrowserRouter([
    {
        path: '/',
        element: <Suspense><Main/></Suspense>
    },
    {
        path: '/:userId',
        element: <Suspense><Main/></Suspense>
    },

     /* user */
    {
        path: '/userLogin',
        element: <Suspense><UserLogin/></Suspense>
    },
    {
        path: '/userSignUp',
        element: <Suspense><UserSignUp/></Suspense>
    },
    {
        path: '/userCompleteSignUp',
        element: <Suspense><UserCompleteSignUp/></Suspense>
    },
    {
        path: '/userFindId',
        element: <Suspense><UserFindId/></Suspense>
    },
    {
        path: '/userFindPw',
        element: <Suspense><UserFindPw/></Suspense>
    },
    {
        path: '/userPwUpdate/:userName',
        element: <Suspense><UserPwUpdate/></Suspense>
    },
    {
        path: '/userUpdate/:userId',
        element: <Suspense><UserUpdate/></Suspense>
    },
    {
        path: '/userCompleteUpdate',
        element: <Suspense><UserCompleteUpdate/></Suspense>
    },
    {
        path: '/userCompleteDelete',
        element: <Suspense><UserCompleteDelete/></Suspense>
    },

    /* advertisement */
    {
        path: '/advertisementList',
        element: <Suspense><AdvertisementList/></Suspense>
    },
    {
        path: '/selectAdvertisement/:advertisementNo',
        element: <Suspense><SelectAdvertisement/></Suspense>
    },

    /* restaurant */
    {
        path: '/restaurantList',
        element: <Suspense><RestaurantList/></Suspense>
    },
    {
        path: '/restaurantDetail',
        element: <Suspense><RestaurantDetail/></Suspense>
    },

    /* reservation */
    {
        path: '/reservationCreate',
        element: <Suspense><ReservationCreate/></Suspense>
    },
    {
        path: '/reservationRead/:createdReservationId',
        element: <Suspense><ReservationRead/></Suspense>
    },
    {
        path: '/myReservation/:userId',
        element: <Suspense><MyReservation/></Suspense>
    },
    {
        path: '/reservationDeleteComplete',
        element: <Suspense><ReservationDeleteComplete/></Suspense>
    },
    /* inquiry */
    {
        path: '/inquiryList',
        element: <Suspense><InquiryList/></Suspense>
    },
    {
        path: '/inquiryCreate',
        element: <Suspense><InquiryCreate/></Suspense>
    },
    {
        path: '/inquiryRead/:author',
        element: <Suspense><InquiryRead/></Suspense>
    },
    {
        path: '/inquiryDeleteComplete',
        element: <Suspense><InquiryDeleteComplete/></Suspense>
    },
    {
        path: '/inquiryUpdate/:author',
        element: <Suspense><InquiryUpdate/></Suspense>
    },
    {
        path: '/inquiryMyList/:author',
        element: <Suspense><InquiryMyList/></Suspense>
    },

    /* admin */
    {
        path: '/adminMain',
        element: <Suspense><AdminMain/></Suspense>
    },

    /* adminUser */
    {
        path: '/adminUser',
        element: <Suspense><AdminUser/></Suspense>
    },
    {
        path: '/adminUserList/:userId',
        element: <Suspense><AdminUserList/></Suspense>
    },
    {
        path: '/adminUserDeleteComplete',
        element: <Suspense><AdminUserDeleteComplete/></Suspense>
    },

    /* adminRestaurant */
    {
        path: '/adminRestaurant',
        element: <Suspense><AdminRestaurant/></Suspense>
    },
    {
        path: '/adminRestaurantCreate',
        element: <Suspense><AdminRestaurantCreate/></Suspense>
    },

    {
        path: '/adminRestaurantUpdate',
        element: <Suspense><AdminRestaurantUpdate/></Suspense>
    },
    {
        path: '/adminRestaurantDelComplete',
        element: <Suspense><AdminRestaurantDelComplete/></Suspense>
    },

    /* adminReservation */
    {
        path: '/adminReservation',
        element: <Suspense><AdminReservation/></Suspense>
    },
    {
        path: '/adminReservationRead/:reservationId',
        element: <Suspense><AdminReservationRead/></Suspense>
    },
    {
        path: '/adminReservationDelComplete',
        element: <Suspense><AdminReservationDelComplete/></Suspense>
    },

    /* adminAdvertisement */
    {
        path: '/adminAdvertisement',
        element: <Suspense><AdminAdvertisement/></Suspense>
    },
    {
        path: '/adminAdvertisementCreate',
        element: <Suspense><AdminAdvertisementCreate/></Suspense>
    },
    {
        path: '/adminAdvertisementUpdate/:advertisementNo',
        element: <Suspense><AdminAdvertisementUpdate/></Suspense>
    },
    {
        path: '/adminAdvertisementDelComplete',
        element: <Suspense><AdminAdDeleteComplete/></Suspense>
    },

    /* adminAnswer */
    {
        path: '/adminAnswer',
        element: <Suspense><AdminAnswer/></Suspense>
    },
    {
        path: '/adminAnswerCreate/:author',
        element: <Suspense><AdminAnswerCreate/></Suspense>
    },
    {
        path: '/adminFixAnswer/:author',
        element: <Suspense><AdminFixAnswer/></Suspense>
    },
    {
        path: '/adminAnswerDelComplete',
        element: <Suspense><AdminAnswerDelComplete/></Suspense>
    },
    {
        path: '/navCanvas/:userId',
        element: <Suspense><NavCanvas/>></Suspense>
    }
])

export default rootRouter