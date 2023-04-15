import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
    const google = () => {
        // TODO: change this in production
        window.open('http://localhost:8080/api/v1/auth/google', '_self');
    };

    return (
        <button className="btn btn-outline-info" onClick={google}>
            <FcGoogle /> Login With Google
        </button>
    );
};

export default GoogleLogin;
