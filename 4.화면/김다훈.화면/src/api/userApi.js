import axios from 'axios';

export const host = 'http://localhost:8000' //백엔드의 주소
const prefix = `${host}/user` //request mapping url이 user로 시작하도록 설정

export const userLogins = async userLogin => {
    const response = await axios.post(`${prefix}/login`, userLogin) //await은 userLogins함수가 call될때까지 작동안하고 기다리고있음.
    return response.data //response는 서버가 보내주는 응답을 받는 객체
}

export const userSignUp = async user => {
    const response = await axios.post(`${prefix}/add`, user)
    return response.data
}

export const fixUserPw = async passwordFix => {
    const response = await axios.patch(`${prefix}/passwordFix`, passwordFix)
    return response.data
}


export const getUser = async userId => {
    const response = await axios.get(`${prefix}/${userId}`)
    return response.data
}

export const userUpdateAx = async userUpdate => {
    const response = await axios.patch(`${prefix}/userUpdate`, userUpdate)
    return response.data
}

export const userDelete = async userId => {
    const response = await axios.delete(`${prefix}/del/${userId}`)
    return response.data
}

export const sendSMS = async (u_phone ,cerNum) => {
    const response = await axios.post(`${prefix}/sendSMS`, cerNum, {
        params: {
            u_phone:u_phone
        }
    })
    return response.data
}

export const handleCheckDuplicate = async (userName) => {
    const response = await axios.get(`${prefix}/checkUserName/${userName}`)
    return response.data
};

export const findUserName = async findUser => {
    const response = await axios.post(`${prefix}/findUserName`,findUser)
    return response.data
}

export const findUserPw = async findUser => {
    const response = await axios.post(`${prefix}/findUserPw`,findUser)
    return response.data
}

/* ------------------------------------------------------------------------------ */

// admin

export const getUsers = async query => {
    const response = await axios.get(`${prefix}/list`, {
        params:query
    })
    return response.data
}

export const searchUser = async param => {
    const response = await axios.get(`${prefix}/search`, {
           params:param
    });
    return response.data
}