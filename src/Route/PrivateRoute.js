import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Shared/Loader';
import { AuthContext } from '../ContextProvider/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()
    if (loader) {
        return <Loader />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    else {
        return children
    }

};

export default PrivateRoute;