import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-8 text-center">
                    <h1 className="display-1 text-center my">MERN INVOICE</h1>
                    <p className="lead text-center my-3">
                        Create Invoices, Receipts and Quotations with our app.
                    </p>
                    <Link to="/register" className="btn btn-success my-3">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
