import axios from 'axios';

const API_URL = 'http://localhost:8080/players';

const userAPI = {
    getAllUsers: (countryCode) => axios.get(API_URL, { params: { country: countryCode } }).then(response => response.data),
    createUser: (user) => axios.post(API_URL, user).then(response => response.data),
    updateUser: (id, user) => axios.put(`${API_URL}/${id}`, user).then(response => response.data),
    deleteUser: (id) => axios.delete(`${API_URL}/${id}`).then(response => response.data),
    searchUsers: (name, license) => axios.get(`${API_URL}/search`, { params: { name, license } }).then(response => response.data),
};

export default userAPI;
