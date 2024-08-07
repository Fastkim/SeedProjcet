import axios from 'axios';

export const host = 'http://localhost:8000';
export const prefix = `${host}/alarm`

export const getAlarms = (userId) => {
    return axios.get(`${prefix}/${userId}`)
        .then(response => response.data)
        .catch(error => console.error("Error fetching alarms:", error));
};

export const addAlarm = () => {
    return axios.post(`${prefix}/add`)
        .then(response => response.data)
        .catch(error => console.error("Error adding alarms:", error));
};

export const deleteAlarm = (alarmId) => {
    return axios.delete(`${prefix}/del/${alarmId}`)
        .then(response => response.data)
        .catch(error => console.error("Error deleting alarm:", error));
};
