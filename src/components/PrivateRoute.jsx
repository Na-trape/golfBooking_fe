import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if token exists

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
