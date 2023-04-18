import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
    const google = () => {
        // TODO: change this in production
        window.open('http://localhost:8080/api/v1/auth/google', '_self');
    };

    return (
        <button
            className="btn btn-light btn-lg d-flex align-items-center gap-3 px-5"
            onClick={google}
        >
            <FcGoogle />
            <span>Login With Google</span>
        </button>
    );
};

export default GoogleLogin;
