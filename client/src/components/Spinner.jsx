import React from 'react';

const Spinner = () => {
    return (
        <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
