import React from 'react';
import { BsFillHeartbreakFill } from 'react-icons/bs';
import { FaSadTear } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <h3 className="text-center text-danger">
                        <BsFillHeartbreakFill />
                    </h3>
                    <h1 className="display-1 d-flex align-items-center justify-content-center">
                        <FaSadTear className="text-warning" /> 404 Not Found
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
