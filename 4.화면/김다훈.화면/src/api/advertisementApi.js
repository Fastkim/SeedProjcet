import axios from 'axios'

export const host = 'http://localhost:8000';
const prefix = `${host}/advertisement`;

export const getAdvertisement = async query => {
    const response = await axios.get(`${prefix}/list`, {
        params:query
    })
    return response.data
}