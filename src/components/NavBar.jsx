import { Link, useNavigate } from 'react-router-dom';

const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px',
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    navItem: {
        color: '#fff',
        marginRight: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export const NavBar = ({ logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        logout()
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <div style={{display: "flex"}}>
                    <li style={styles.navItem}>
                        <Link to="/main" style={styles.navLink}>Main</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/products" style={styles.navLink}>Products</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/users" style={styles.navLink}>Users</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/statistics" style={styles.navLink}>Statistics</Link>
                    </li>
                </div>
                <li style={styles.navItem} onClick={handleLogout}>
                    Logout
                </li>
            </ul>
        </nav>
    );
};
