import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Utilites/Loading';

const RequreAuth = ({ children }) => {
      const [user, lodaing] = useAuthState(auth)
      const location = useLocation()

      if (lodaing) {
            return <Loading></Loading>
      }

      if (!user) {
            return <Navigate to="/login" state={{ from: location }} replace />;
      }


      return children
}

export default RequreAuth;