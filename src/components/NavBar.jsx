import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/main" style={styles.navLink}>Main</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/products" style={styles.navLink}>Products</Link>
                </li>
            </ul>
        </nav>
    );
};

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
    },
    navItem: {
        marginRight: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default NavBar;
