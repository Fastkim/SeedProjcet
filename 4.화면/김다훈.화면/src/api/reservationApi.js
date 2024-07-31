import axios from 'axios'

export const host = 'http://localhost:8000';
const prefix = `${host}/reservation`;

export const getReservations = async param => {
    const response = await axios.get(`${prefix}/list`, {
        params: param
    })
    return response.data
}

export const getReservation = async reservationId => {
    const response = await axios.get(`${prefix}/${reservationId}`)
    return response.data
}

export const addReservation = async reservation => {
    const response = await axios.post(`${prefix}/add`, reservation)
    return response.data
}

export const delReservation = async reservationId => {
    const response = await axios.delete(`${prefix}/del/${reservationId}`)
    return response.data
}