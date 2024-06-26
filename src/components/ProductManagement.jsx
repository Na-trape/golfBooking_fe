import { useState, useEffect } from 'react';
import productAPI from '../apis/productAPI';

const ProductManagement = () => {


    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: '',
        price: '',
        category: '',
        description: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        name: '',
        category: ''
    });


    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await productAPI.getAllProducts();
        setProducts(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleCreateUpdateProduct = async () => {
        const token = localStorage.getItem('accessToken');
        if (isEditing) {
            await productAPI.updateProduct(selectedProduct.id, selectedProduct);
        } else {
            await productAPI.createProduct(selectedProduct, token);
        }
        loadProducts();
        clearForm();
    };

    const handleDeleteProduct = async (id) => {
        await productAPI.deleteProduct(id);
        loadProducts();
    };

    const handleSearchProducts = async () => {
        const data = await productAPI.searchProducts(searchCriteria.name, searchCriteria.category);
        setProducts(data);
    };

    const clearForm = () => {
        setSelectedProduct({
            id: null,
            name: '',
            price: '',
            category: '',
            description: ''
        });
        setIsEditing(false);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>{isEditing ? 'Edit Product' : 'Create Product'}</h2>
                <form>
                    <div style={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={selectedProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={selectedProduct.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={handleCreateUpdateProduct}>
                            {isEditing ? 'Update' : 'Create'}
                        </button>
                        {isEditing && <button type="button" onClick={clearForm}>Cancel</button>}
                    </div>
                </form>
            </div>
            <div style={styles.listContainer}>
                <h2>Search Products</h2>
                <div style={styles.searchGroup}>
                    <div style={styles.formGroup}>
                        <label>Search by Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Search by Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={searchCriteria.category}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button type="button" onClick={handleSearchProducts}>Search</button>
                </div>
                <h2>Product List</h2>
                <ul style={styles.productList}>
                    {products.map(product => (
                        <li key={product.id} style={styles.productListItem}>
                            <div>
                                <strong>{product.name}</strong> - ${product.price}
                            </div>
                            <div>{product.category}</div>
                            <div>{product.description}</div>
                            <button onClick={() => handleSelectProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
        flex: 1,
        marginRight: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    buttonGroup: {
        marginTop: '20px',
    },
    listContainer: {
        flex: 1,
    },
    searchGroup: {
        marginBottom: '20px',
    },
    productList: {
        listStyleType: 'none',
        padding: 0,
    },
    productListItem: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
};

export default ProductManagement;
