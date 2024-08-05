import axios from 'axios'

export const host = 'http://localhost:8000';
const prefix = `${host}/api/inquiries`;

export const getInquiries = async () => {
    const response = await axios.get(`${prefix}`)
    return response.data
}

export const getInquiry = async inquiryId => {
    const response = await axios.get(`${prefix}/${inquiryId}`)
    return response.data
}

export const addInquiry = async inquiry => {
    const response = await axios.post(`${prefix}`, inquiry)
    return response.data
}

export const updateInquiry = async (inquiryId, updatedInquiry) => {
    const response = await axios.put(`${prefix}/${inquiryId}`, updatedInquiry)
    return response.data
}

export const delInquiry = async inquiryId => {
    const response = await axios.delete(`${prefix}/${inquiryId}`)
    return response.data
}