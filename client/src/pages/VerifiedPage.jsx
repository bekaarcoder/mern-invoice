import React from 'react';
import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const VerifiedPage = () => {
    useTitle('Account Verified - MERN Invoice');
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-75">
                <div className="col-md-8 d-flex flex-column align-items-center">
                    <h2>
                        <FaCheckCircle className="text-success" />
                    </h2>
                    <h2>Account Verified</h2>
                    <p>
                        Your Account has been verified and ready for use. An
                        email confirmation has been sent to your email.
                    </p>
                    <p>
                        Please <Link to="/login">login</Link> to use our
                        service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifiedPage;
