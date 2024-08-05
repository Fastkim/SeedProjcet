import axios from 'axios'

export const host = 'http://localhost:8000';
const prefix = `${host}/api/restaurants`;

export const getRestaurants = async () => {
    const response = await axios.get(`${prefix}`)
    return response.data
}

export const getRestaurant = async restaurantId => {
    const response = await axios.get(`${prefix}/${restaurantId}`)
    return response.data
}

export const addRestaurant = async restaurant => {
    const response = await axios.post(`${prefix}`, restaurant)
    return response.data
}

export const delRestaurant = async restaurantId => {
    const response = await axios.delete(`${prefix}/${restaurantId}`)
    return response.data
}