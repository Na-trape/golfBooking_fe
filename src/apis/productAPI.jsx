import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

const productAPI = {
    getAllProducts: () => axios.get(API_URL).then(response => response.data),
    createProduct: (product) => axios.post(API_URL, product).then(response => response.data),
    updateProduct: (id, product) => axios.put(`${API_URL}/${id}`, product).then(response => response.data),
    deleteProduct: (id) => axios.delete(`${API_URL}/${id}`).then(response => response.data)
};

export default productAPI;
