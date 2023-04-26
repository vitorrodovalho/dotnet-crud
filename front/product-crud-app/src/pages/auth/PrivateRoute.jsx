import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import KJUR from 'jsrsasign';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    let isValid = false;
    if (token) {
        isValid = KJUR.jws.JWS.verifyJWT(
            token,
            'asdv234234^&%&^%&^hjsdfb2%%%',
            {
                alg: ['HS256'],
            }
        );
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                isValid ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;
