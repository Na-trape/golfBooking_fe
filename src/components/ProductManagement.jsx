import { useState, useEffect } from 'react';
import productAPI from '../apis/productAPI';

const ProductManagement = () => {


    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({
        id: null,
        name: '',
        price: '',
        category: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);

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

    const handleCreateUpdateProduct = async () => {
        if (isEditing) {
            await productAPI.updateProduct(selectedProduct.id, selectedProduct);
        } else {
            await productAPI.createProduct(selectedProduct);
        }
        loadProducts();
        clearForm();
    };

    const handleDeleteProduct = async (id) => {
        await productAPI.deleteProduct(id);
        loadProducts();
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
        <div style={{ display: 'flex', padding: '20px' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
                <h2>{isEditing ? 'Edit Product' : 'Create Product'}</h2>
                <form>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={selectedProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={selectedProduct.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button type="button" onClick={handleCreateUpdateProduct}>
                            {isEditing ? 'Update' : 'Create'}
                        </button>
                        {isEditing && <button type="button" onClick={clearForm}>Cancel</button>}
                    </div>
                </form>
            </div>
            <div style={{ flex: 1 }}>
                <h2>Product List</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id} style={{ marginBottom: '10px' }}>
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

export default ProductManagement;
