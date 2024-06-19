import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

const productAPI = {
    getAllProducts: () => axios.get(API_URL).then(response => response.data),
    createProduct: (product, token) => axios.post(API_URL, product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.data),    updateProduct: (id, product) => axios.put(`${API_URL}/${id}`, product).then(response => response.data),
    deleteProduct: (id) => axios.delete(`${API_URL}/${id}`).then(response => response.data),
    searchProducts: (name, category) => axios.get(`${API_URL}/search`, { params: { name, category } }).then(response => response.data),
    getProductsByMonth: (monthsAgo) => axios.get(`${API_URL}/filter`, { params: { monthsAgo } }).then(response => response.data)
};

export default productAPI;
