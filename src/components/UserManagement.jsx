import { useState, useEffect } from 'react';
import userAPI from '../apis/userAPI';
import { countries } from '../service/Countries';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        id: null,
        name: '',
        license: '',
        countryId: '',
        password: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        name: '',
        license: ''
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await userAPI.getAllUsers();
        setUsers(data.players);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleCreateUpdateUser = async () => {
        if (isEditing) {
            await userAPI.updateUser(selectedUser.id, selectedUser);
        } else {
            await userAPI.createUser(selectedUser);
        }
        loadUsers();
        clearForm();
    };

    const handleDeleteUser = async (id) => {
        await userAPI.deleteUser(id);
        loadUsers();
    };

    const clearForm = () => {
        setSelectedUser({
            id: null,
            name: '',
            license: '',
            countryId: '',
            password: ''
        });
        setIsEditing(false);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleSearchUsers = async () => {
        const { name, license } = searchCriteria;
        const data = await userAPI.searchUsers(name, license);
        setUsers(data);
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
                <form>
                    <div style={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={selectedUser.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>License:</label>
                        <input
                            type="number"
                            name="license"
                            value={selectedUser.license}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Country:</label>
                        <select
                            name="countryId"
                            value={selectedUser.countryId}
                            onChange={handleInputChange}
                            required
                        >
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={selectedUser.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={handleCreateUpdateUser}>
                            {isEditing ? 'Update' : 'Create'}
                        </button>
                        {isEditing && <button type="button" onClick={clearForm}>Cancel</button>}
                    </div>
                </form>
            </div>
            <div style={styles.listContainer}>
                <h2>Search Users</h2>
                <div style={styles.searchGroup}>
                    <div style={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>License:</label>
                        <input
                            type="number"
                            name="license"
                            value={searchCriteria.license}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button type="button" onClick={handleSearchUsers}>Search</button>
                </div>
                <h2>User List</h2>
                <ul style={styles.userList}>
                    {users.map(user => (
                        <li key={user.id} style={styles.userListItem}>
                            <div>
                                <strong>{user.name}</strong> - License: {user.license}
                            </div>
                            {/*<div>Country: {getCountryNameById(user.countryId)}</div>*/}
                            <button onClick={() => handleSelectUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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
    userList: {
        listStyleType: 'none',
        padding: 0,
    },
    userListItem: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
};

export default UserManagement;
